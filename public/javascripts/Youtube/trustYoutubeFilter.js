/* /javascripts/Youtube/trustYoutubeFilter.js */ 

angular
	.module('NBA5')
	.filter('trusted', ['$sce', function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	}]);