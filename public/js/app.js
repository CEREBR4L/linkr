
var app = angular.module('linkr', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'homeCont',
			controllerAs: 'home'
		})
		.when('/useapi', {
			templateUrl: 'views/api.html',
			controller: 'apiCont',
			controllerAs: 'api'
		})
		.otherwise({
			redirectTo: '/'
		});

	 $locationProvider.html5Mode(true);
})
