/* /javascripts/Favorites/FavoritesService.js */ 

angular
	.module('NBA5')
	.factory('Favorites', ['$http', function($http) {
		var o = {
			username: '',
			players: []
		};

		o.getFavorites = function(id) {
			return $http.get('/api/users/' + id)
				.error(function(error) {
					console.log(error);
				})
				.success(function(data) {
					o.username = data.username;
					o.players = data.favorites;
				});
		};

		o.addFavorite = function(userID, playerID) {
			return $http.post('/api/favorites/' + userID + '/' + playerID, {})
				.error(function(error) {
					console.log(error);
				});
		};

		o.removeFavorite = function(userID, playerID) {
			return $http.delete('/api/favorites/' + userID + '/' + playerID)
				.error(function(error) {
					console.log(error);
				});
		};

		return o;
	}]);