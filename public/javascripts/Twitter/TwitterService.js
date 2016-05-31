/* /javascripts/Twitter/TwitterService.js */ 

angular
	.module('NBA5')
	.factory('Twitter', ['$http', function($http) {
		var o = {};

		o.favoriteTweet = function(tweetID) {
			return $http.post('/api/players/twitter/favorite', {tweetID: tweetID})
				.error(function(error) {
					console.log(error);
				});
		};

		o.retweet = function(tweetID) {
			return $http.post('/api/players/twitter/retweet', {tweetID: tweetID})
				.error(function(error) {
					console.log(error);
				});
		};

		return o;
	}]);