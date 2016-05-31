/* /javascripts/Players/PlayersController.js */ 

angular
	.module('NBA5')
	.controller('PlayersCtrl', ['$scope', 'Players', 'Auth', 'Favorites', function($scope, Players, Auth, Favorites) {
		/* Variables */ 
		$scope.players = Players.players;
		var userID;

		/* Functions */ 
		$scope.manageFavorites = function(playerID) {
			Favorites.addFavorite(userID, playerID)
				.success(function(data) {
					console.log(data);
					$scope.message = data.message;
				});
		};

		$scope.isLoggedIn = Auth.isLoggedIn;

		/* On Load */ 
		if (Auth.isLoggedIn()) {
			Auth.currentId()
				.success(function(data) {
					userID = data[0]._id;
				});
		}
	}]);