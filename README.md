# LINKR 

Linkr is an app for minifying URLs, we allows users to submit links and have them minified into a linkr url that can be linked and will redirect to the original url that was entered. Linkr allows for private and public links, public links have an API so that everyone is able to access them or use the data however they see fit. 

You can also create new links with api calls and request the top x most recent records. You can read more about our API [here](http://linkr.xyz/useapi).

Application Link: [linkr](http://linkr.xyz/)

## How to set up for local use

You will need to fork and pull the repo or clone it.

Then once you have the files locally you will need to make sure mongodb and node are installed on the machine you plan on running the app on. Then you will need to install the dependences using:

`npm install`

### Change Config

Then you need to edit the config so it will work in a local environment.

In server.js, privateLinks.js and redirects.js uncomment the Test config and commit out the live. 
```js
/* Live config */
//var port = process.env.PORT || 80;

/* Test Config */
var port = process.env.PORT || 8080;
```
Note: in redirects.js you will also need to change the connect lines over.

In `(root)/public/js/controllers/homeCont.js` swap the following over to test, as per below.
```js
/*Live config*/
//$scope.siteURL = "http://linkr.xyz/";

/*Test config*/
$scope.siteURL = "http://localhost:8080/";
```

### Start App

In one consol run mongodb: 

`mongod --port 27018`

In another consol run the app:

`node server.js`

You should then be good to work and test in a local environment, please note you will need to change over the config to live before making any pull requests to this repo.  

[Any issues or problems let us know.](https://github.com/CEREBR4L/linkr/issues)
