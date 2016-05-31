/* /javascripts/Footer/FooterDirective.js */

angular
	.module('NBA5')
	.directive('myFooter', function() {
		return {
			restrict: 'AE',
			templateUrl: '/templates/partials/FooterView.html'
		};
	});