var express = require('express');
var redirects = require('./routes/redirects.js');

var app = express();

var port = process.env.PORT || 3000;

app.get('/', redirects.home);
app.get('/links', redirects.findAll);
app.get('/new/:url*', redirects.newURL);
app.get('/new', redirects.new);
app.get('/:URLid', redirects.URLRedirect);

app.listen(port, function(){
	console.log("API App active and running on: " + port);
});
