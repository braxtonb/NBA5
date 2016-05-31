/* /javascripts/Navbar/NavbarDirective.js */ 

angular
	.module('NBA5')
	.directive('nbaNav', function() {
		return {
			restrict: 'AE',
			templateUrl: '/templates/partials/NavbarView.html',
			controller: NavCtrl
		};
	});

	function NavCtrl($scope, Auth) {
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.username = Auth.currentUser();
		$scope.logOut = Auth.logOut;

		if (Auth.isLoggedIn()) {
			Auth.currentId()
				.success(function(data) {
					$scope.id = data[0]._id;
				});
		}

	}