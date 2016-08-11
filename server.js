var express = require('express');
var redirects = require('./api/routes/redirects.js');
var privateLinks = require('./api/routes/privateLinks.js');

var app = express();

/* Live config */
var port = process.env.PORT || 80;

/* Test Config */
//var port = process.env.PORT || 8080;

/*
 API ROUTES
 */

/* PUBLIC LINKS */
app.get('/api/links', redirects.findAll);
app.get('/api/links/:no', redirects.findAmount);
app.get('/api/new/:url*', redirects.newURL);
app.get('/api/new', redirects.new);
app.get('/r/:URLid', redirects.URLRedirect);

/* PRIVATE LINKS */
//app.get('/api/p/links', privateLinks.findAll); /*!! FOR TESTING ONLY !!*/
app.get('/api/p/new/:url*', privateLinks.newURL);
app.get('/p/:URLid', privateLinks.URLRedirect);



/*
 ANGULAR FRONT END
 */

app.use('/css/', express.static(__dirname + '/public/css/'));
app.use('/js/', express.static(__dirname + '/public/js/'));
app.use('/views/', express.static(__dirname + '/public/views/'));

app.use('*', function(req, res){
	res.sendFile(__dirname + '/public/');
});

app.listen(port, function(){
	console.log("App active and running on: " + port);
});
