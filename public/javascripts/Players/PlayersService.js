/* /javascripts/Players/PlayersService.js */ 

angular
	.module('NBA5')
	.factory('Players', ['$http', function($http) { 
		var o = {
			players: [],
			individual: {}
		};

		/* Functions */ 
		o.getPlayers = function() {
			return $http.get('/api/players')
				.success(function(data) {
					o.players = data;
				})
				.error(function(error) {
					console.log(error);
				});
		};

		o.getIndividual = function(id) {
			return $http.get('/api/players/' + id)
				.success(function(data) {
					o.individual = data;
				})
				.error(function(error) {
					console.log(error);
				});
		};

		return o;
	}]);