var express = require('express');
var redirects = require('./api/routes/redirects.js');

var app = express();

var port = process.env.PORT || 80;

/*
 API ROUTES
 */
app.get('/api/links', redirects.findAll);
app.get('/api/new/:url*', redirects.newURL);
app.get('/api/new', redirects.new);
app.get('/r/:URLid', redirects.URLRedirect);

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
