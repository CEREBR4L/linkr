angular.module('linkr')
	.controller('apiCont', function useApiController($scope){
		
		$scope.title = "Linkr API";
		$scope.desc = "";

		$scope.apiUse = [
			{
				"routeTitle": "Find all links",
				"routeDesc": "This allows you to get all the links that are in our database in one call to our api.",
				"exampleCall": "http://linkr.xyz/api/links",
				"exampleResp": '[{"code":0,"link":"https://github.com/CEREBR4L","_id":"579aba9c8218588117acffe9","__v":0},{"code":1,"link":"http://pointless.space/","_id":"579abaac8218588117acffea","__v":0}]'
			},
			{
				"routeTitle": "Get new link",
				"routeDesc": "This will allow you to create one new link in our database using a url and it will return the url and short code as well as the new linkr short link.",
				"exampleCall": "http://link.xyz/api/new/https://github.com/CEREBR4L",
				"exampleResp": '{"link":"https://github.com/CEREBR4L","code":3,"redirectLink":"http://linkr.xyz/r/3"}'
			}
		];

	});
