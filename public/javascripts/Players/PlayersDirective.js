/* /javascripts/Players/PlayersDirective.js */ 

angular
	.module('NBA5')
	.directive('players', function() {
		return {
			restrict: 'AE',
			templateUrl: '/templates/partials/PlayersView.html'
		};
	});