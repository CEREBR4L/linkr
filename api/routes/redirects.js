var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoInc = require('mongoose-auto-increment');
var http = require('http');
var url = require('url');

var connect = mongoose.connect('mongodb://localhost:27018/linkr');

autoInc.initialize(connect);

var dbSchema = new Schema({
	link: String, 
	code: Number
})

dbSchema.plugin(autoInc.plugin, {model: 'redirects', field: 'code'});
var redirects = connect.model('redirects', dbSchema);

var siteURL = "http://localhost:3000/";

exports.findAll = function(req, res){
	redirects.find({}, function(err, items){
		res.json(items);
	});
};

exports.newURL = function(req, res){

	var url = req.url.slice(9); 
	var url = validateURL(url);

	if(url == "Failed"){
		res.send({error: "Please provide a valid URL"});
	}
	else{
		links = new redirects({link: url});

		links.save(function(err, linkObj){

			if(err){
				console.log("Err saving links! - " + err);
			}
			else{
				console.log("Links saved! - " + linkObj);
				res.send({
					link: linkObj.link, 
					code: linkObj.code, 
					redirectLink: siteURL + '' + linkObj.code
				});
			}

		})
	}

};

exports.home = function(req, res){
	res.send("linkr API");
}

exports.new = function(req, res){
	res.send("Please enter a URL after 'new/' to create your short code");
}

exports.URLRedirect = function(req, res){

	var redirectCode = parseInt(req.params.URLid);

	console.log("Getting URL for: " + redirectCode);

	redirects.findOne({'code': redirectCode}, function(err, item){
		if(err){	
			console.log("There was an error: " + err );
		}

		activeUrl(item.link, function(resp){
			console.log('STATUS: ' + resp);

			if(resp == 200 || resp == 304){
				res.redirect(item.link);
			}
			
			if(resp == "ENOTFOUND"){
				res.redirect(siteURL + '#oops');
			}

		});

	});
};


function validateURL(url){
	var regex = new RegExp(/[https|http]?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
	if(url.match(regex)){
		return url
	}
	else{
		return "Failed";
	}
}


function activeUrl(Url, callback){

	console.log("REQUESTED URL: " + url.parse(Url).host);
	var thing;
	var options = {
		method: 'HEAD',
		host: url.parse(Url).host,
		port: 80,
		path: url.parse(Url).pathname
	};

	var req = http.request(options, function(r){

		console.log("Log r: " + r.statusCode);

		if (r.statusCode == 200 || r.statusCode == 304) {
			callback(r.statusCode);
		}

	});

	req.on('error', function(err){
		console.log(err);
		callback(err.code);
	});

	req.end();

}

