var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var http = require('http');
var url = require('url');

/* Live config */
var siteURL = "http://linkr.xyz/";

/* Test config */
//var siteURL = "http://localhost:8080/";

var dbSchema = new Schema({
	link: String, 
	_id: {
		type: String,
		'default': shortid.generate
	}
})

var privateLinks = mongoose.model('privateLinks', dbSchema);

/* FOR TEST PURPOSES ONLY! */

exports.findAll = function(req, res){
	privateLinks.find({}, function(err, items){
		res.json(items);
	});
};


exports.newURL = function(req, res){
	
	/*regexs we will need*/

	var regex = new RegExp(/^https?:\/\//);
	var linkr = new RegExp(/linkr.xyz(\/r|\/p)\/*/);

	/*manipulate url if needed*/

	var url = req.url.slice(11); 

	if(!regex.test(url)){
		url = "http://" + url;
	}

	var url = validateURL(url);

	if(url == "Failed" || linkr.test(url)){
		res.send({error: "Please provide a valid URL"});
	}
	else{

		links = new privateLinks({link: url});

		links.save(function(err, linkObj){

			if(err){

				console.log("Err saving links! - " + err);

			}
			else{

				console.log("Links saved! - " + linkObj);

				res.send({
					_id: linkObj._id, 
					link: linkObj.link, 
					redirectLink: siteURL + 'p/' + linkObj._id
				});

			}
		})
	}
};


exports.URLRedirect = function(req, res){

	var redirectCode = req.params.URLid;

	privateLinks.findOne({'_id': redirectCode}, function(err, item){
		if(err){	
			console.log("There was an error: " + err );
		}

		if(!item){
			res.send('Not Found');
		}
		else{
			activeUrl(item.link, function(resp){
				
				console.log('STATUS: ' + resp);
				
				if(resp == "ENOTFOUND" || resp == "ECONNREFUSED" || resp == "ECONNRESET"){
					res.redirect(siteURL + '#oops');
				}
				else{
					res.redirect(item.link);
				}

			});
		}

	});
};


function validateURL(url){
	/*
		regex pattern taken from http://stackoverflow.com/a/3809435/3909521
	*/
	var expression = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
	var regex = new RegExp(expression);
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

		callback(r.statusCode);

	});

	req.on('error', function(err){
		console.log(err);
		callback(err.code);
	});

	req.end();

}

