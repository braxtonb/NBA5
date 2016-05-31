/* /javascripts/Favorites/FavoritesController.js */ 

angular
	.module('NBA5')
	.controller('FavoritesCtrl', ['Favorites', '$scope', 'Auth', '$window', function(Favorites, $scope, Auth, $window) {
		/* Variables */ 
		$scope.players = Favorites.players;
		$scope.username = Favorites.username;
		var userID;

		/* Functions */ 
		$scope.manageFavorites = function(playerID) {
			Favorites.removeFavorite(userID, playerID)
				.success(function(data) {
					console.log(data);
					$scope.message = data.message;
					$window.location.reload();
				});
		};

		/* On Load */ 
		Auth.currentId()
			.success(function(data) {
				userID = data[0]._id;
			});
	}]);