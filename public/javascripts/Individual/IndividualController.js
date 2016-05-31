/* /javascripts/Individual/IndividualController.js */ 

angular
	.module('NBA5')
	.controller('IndividualCtrl', ['$scope', 'Players', 'Twitter', function($scope, Players, Twitter) {
		$scope.individual = Players.individual;

		$scope.favoriteTweet = function(tweetID) {
			Twitter.favoriteTweet(tweetID)
				.success(function(data) {
					$scope.message = data.message;
				});
		};

		$scope.retweet = function(tweetID) {
			Twitter.retweet(tweetID)
				.success(function(data) {
					$scope.message = data.message;
				});
		};
	}]);