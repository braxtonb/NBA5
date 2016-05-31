/* /javascripts/Authentication/AuthController.js */ 

angular
	.module('NBA5')
	.controller('AuthCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {


		/* Functions */ 
		$scope.register = function(user) {
			Auth.register(user)
				.error(function(error) {
					$scope.error = error;
				})
				.then(function() {
					$location.path('/');
				});
		};

		$scope.logIn = function(user) {
			Auth.logIn(user)
				.error(function(error) {
					$scope.error = error;
				})
				.then(function() {
					$location.path('/');
				});
		};

		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.currentUser = Auth.currentUser;
		$scope.logOut = Auth.logOut;
	}]);