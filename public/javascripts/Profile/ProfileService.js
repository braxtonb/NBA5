/* /javascripts/Profile/ProfileService.js */ 

angular
	.module('NBA5')
	.factory('Profile', ['$http', 'Auth', function($http, Auth) {
		var o = {};

		o.getProfile = function(id) {
			return $http.get('api/users/' + id)
				.error(function(error) {
					console.log(error);
				})
				.success(function(data) {
					o.twitter = data.twitter;
					o.facebook = data.facebook;
					o.instagram = data.instagram;
					o.hometown = data.hometown;
					o.favoriteTeam = data.favoriteTeam;
					o.favoritePlayer = data.favoritePlayer;
				});
		};

		return o;
	}]);