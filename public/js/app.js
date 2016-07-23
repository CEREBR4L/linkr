
var app = angular.module('linkr', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'homeCont',
			controllerAs: 'home'
		})
		.otherwise({
			redirectTo: '/'
		});
})
