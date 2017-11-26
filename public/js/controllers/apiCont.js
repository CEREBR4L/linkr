angular.module('linkr')
	.controller('apiCont', function useApiController($scope){
		
		$scope.title = "Public API Routes";
		$scope.desc = "";

		$scope.apiUse = [
			{
				"routeTitle": "Get new link",
				"routeDesc": "This will allow you to create one new link in our database using a url and it will return the url and short code as well as the new linkr short link.",
				"exampleCall": "/api/new/https://www.google.co.uk/",
				"exampleResp": '{"link":"https://www.google.co.uk/","code":3,"redirectLink":"http://linkr.xyz/r/SJElZ2iK"}'
			},
			{
				"routeTitle": "Find all links",
				"routeDesc": "This allows you to get all the links that are in our database in one call to our api.",
				"exampleCall": "/api/links",
				"exampleResp": '[{"code":0,"link":"https://www.google.co.uk/","_id":"579aba9c8218588117acffe9","__v":0},{"code":1,"link":"http://pointless.space/","_id":"579abaac8218588117acffea","__v":0}]'
			},
			{
				"routeTitle": "Find most recent",
				"routeDesc": "This allows you to get the most recent links that are in our database limited to the number you set at the end of the call.",
				"exampleCall": "/api/links/1",
				"exampleResp": '[{"_id":"579f8fd2b1f34f9321fc5987","code":8782,"link":"https://www.google.co.uk/","__v":0}]'
			}
		];

		$scope.privateTitle = "Private API Routes";

		$scope.privateApi = [
			{
				"routeTitle": "Get new private link",
				"routeDesc": "This will allow you to submit a new url to the database that is private and not avaliable to the public eye or any API calls. You will get back the id, the original link (link) and the short link (redirectLink) as a JSON response.",
				"exampleCall": "/api/p/new/https://www.google.co.uk/",
				"exampleResp": '{"_id":"SJElZ2iK","link":"https://www.google.co.uk/","redirectLink":"http://linkr.xyz/p/SJElZ2iK"}'
			}
		];

	});
