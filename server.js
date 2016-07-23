var express = require('express');
var redirects = require('./api/routes/redirects.js');

var app = express();

var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public/'));
app.get('/api', redirects.home);
app.get('/api/links', redirects.findAll);
app.get('/api/new/:url*', redirects.newURL);
app.get('/api/new', redirects.new);
app.get('/api/:URLid', redirects.URLRedirect);

app.listen(port, function(){
	console.log("App active and running on: " + port);
});
