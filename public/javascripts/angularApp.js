/* /javascripts/angularApp.js */

angular
	.module('NBA5', ['ngRoute', 'ui.bootstrap'])
	.config(function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: '/templates/index.html',
			controller: 'CarouselCtrl'
		})
			.when('/players', {
				templateUrl: '/templates/players.html',
				controller: 'PlayersCtrl',
				resolve: {
					playersPromise: ['Players', function(Players) {
						return Players.getPlayers();
					}]
				}
			})
			.when('/players/:player', {
				templateUrl: '/templates/individual.html',
				controller: 'IndividualCtrl',
				resolve: {
					individualPromise: ['Players', '$route', function(Players, $route) {
						return Players.getIndividual($route.current.params.player);
					}]
				}
			})
			.when('/profile/:user', {
				templateUrl: '/templates/profile.html',
				controller: 'ProfileCtrl',
				resolve: {
					profilePromise: ['Profile', '$route', function(Profile, $route) {
						return Profile.getProfile($route.current.params.user);
					}]
				}
			})
			.when('/favorites/:user', {
				templateUrl: '/templates/favorites.html',
				controller: 'FavoritesCtrl',
				resolve: {
					favoritesPromise: ['Favorites', '$route', function(Favorites, $route) {
						return Favorites.getFavorites($route.current.params.user);
					}]
				}
			})
			.when('/login', {
				templateUrl: '/templates/login.html',
				controller: 'AuthCtrl'
			})
			.when('/register', {
				templateUrl: '/templates/register.html',
				controller: 'AuthCtrl'
			})
			.otherwise('/');
	});