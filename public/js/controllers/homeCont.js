angular.module('linkr')
	.controller('homeCont', function homeController($scope, $http){

		/*Live config*/
		$scope.siteURL = "http://linkr.xyz/";
		
		/*Test config*/
		//$scope.siteURL = "http://localhost:8080/";

		$scope.title = "Your link will appear here";
		$scope.urlPath = "#";
		$scope.url = $scope.text;
		$scope.links;
		$scope.titleColour = { "color": '#F5DEB3' };

		$scope.getNewURL = function(url){

			$scope.url = $scope.text;
			console.log("Getting New Url: " + $scope.url);

			$http({
				method: 'GET',
				url: '/api/new/' + $scope.url
			}).then(function successCallback(res){
		
				if(res.data.error){
					$scope.errorStyle();
					$scope.title = res.data.error;

					$scope.text = "";

				} 
				else if($scope.text == "" || $scope.text == null || $scope.text == undefined){
					$scope.errorStyle();
					$scope.title = "Please enter a link";
				}
				else{
					$scope.titleColour = { 
						"color": '#F5DEB3',
						"font-weight": "300" 
					};
					$scope.title = res.data.redirectLink;
					$scope.urlPath = $scope.title;

					$scope.text = "";

				}

			}, function errorCallback(res){
				$scope.title = res.status;
			});

			//refresh me grid pls
			$scope.getLinks();

		}

		$scope.getLinks = function(){

			$http({
				method: 'GET',
				url: '/api/links/100'
			}).then(function successCallback(res){
	
				$scope.links = res.data;

			}, function errorCallback(res){
				$scope.links = res.status;
			});

		}

		$scope.log = function(){
			console.log("logging");
		}

		$scope.getLinks();

		$scope.errorStyle = function(){
			return $scope.titleColour = { 
						"color": '#FF6F68',
						"font-weight": "400"
					};
		}

	});
