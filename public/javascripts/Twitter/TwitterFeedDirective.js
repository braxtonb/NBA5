/* /javascripts/Twitter/TwitterFeedDirective.js */ 

angular
	.module('NBA5')
	.directive('twitterFeed', function() {
		return {
			restrict: 'AE',
			templateUrl: '/templates/partials/TwitterFeedView.html'
		};
	});