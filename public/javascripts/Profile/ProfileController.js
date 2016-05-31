/* /javascripts/Profile/ProfileController.js */ 

angular
	.module('NBA5')
	.controller('ProfileCtrl', ['$scope', 'Auth', 'Profile', '$location', function($scope, Auth, Profile, $location) {
		$scope.twitter = Profile.twitter;
		$scope.facebook = Profile.facebook;
		$scope.instagram = Profile.instagram;
		$scope.hometown = Profile.hometown;
		$scope.favoriteTeam = Profile.favoriteTeam;
		$scope.favoritePlayer = Profile.favoritePlayer;

		if (!Auth.isLoggedIn) {
			$location.path('/');
		}

	}]);