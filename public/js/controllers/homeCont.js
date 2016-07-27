angular.module('linkr')
	.controller('homeCont', function homeController($scope, $http){
		
		$scope.title = "Your Link Will Appear Here";
		$scope.urlPath = "#";
		$scope.url = $scope.text;

		$scope.getNewURL = function(url){

			$scope.url = $scope.text;
			console.log("Getting New Url: " + $scope.url);

			$http({
				method: 'GET',
				url: '/api/new/' + $scope.url
			}).then(function successCallback(res){
		
				if(res.data.error){
					$scope.title = "Please provide a valid URL"
				} 
				else{
					$scope.title = res.data.redirectLink;
					$scope.urlPath = $scope.title;
				}

			}, function errorCallback(res){
				$scope.title = res.status;
			});

			$scope.text = "";

		}

		$scope.log = function(){
			console.log("logging");
		}

	});
