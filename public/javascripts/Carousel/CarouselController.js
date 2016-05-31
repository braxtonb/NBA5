/* /javascripts/Carousel/CarouselController.js */

angular
	.module('NBA5')
	.controller('CarouselCtrl', ['$scope', 'Auth', function($scope, Auth) {
		$scope.myInterval = 5000;
		$scope.noWrapSlides = false;
		$scope.active = 0;

		$scope.slides = [{
			image: 'https://s3.amazonaws.com/nbaproject/nbalogo.jpg',
			link: 'http://www.nba.com',
			text: "NBA.com"
		},
		{
			image: 'https://s3.amazonaws.com/nbaproject/players.jpg',
			link: '#/players',
			text: 'Players Portal'
		}];
	}]);