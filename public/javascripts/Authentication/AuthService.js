/* /javascripts/Authentication/AuthService.js */ 

angular
  .module('NBA5')
  .factory('Auth', ['$http', '$window',
    function($http, $window) {
      var auth = {};

      auth.saveToken = function(token) {
        $window.localStorage['kyc-token'] = token;
      };

      auth.getToken = function() {
        return $window.localStorage['kyc-token'];
      };

      auth.isLoggedIn = function() {
        var token = auth.getToken();

        if (token) {
        	var payload = JSON.parse($window.atob(token.split('.')[1]));

        	return payload.exp > Date.now() / 1000;
        } else {
        	return false;
        }
      };

      auth.currentUser = function() {
      	if (auth.isLoggedIn()) {
      		var token = auth.getToken();
      		var payload = JSON.parse($window.atob(token.split('.')[1]));

      		return payload.username;
      	}
      };

      auth.currentId = function() {
        var username = auth.currentUser();
        return $http.post('api/users/id', { username: username }, {
          headers: {Authorization: 'Bearer ' + auth.getToken()}
        });
      };

      auth.register = function(user) {
      	return $http.post('/api/users/register', user, {
          headers: {Authorization: 'Bearer ' + auth.getToken()}
        })
      		.success(function(data) {
      			auth.saveToken(data.token);
      		});
      };

      auth.logIn = function(user) {
      	return $http.post('/api/users/login', user, {
          headers: {Authorization: 'Bearer ' + auth.getToken()}
        })
      		.success(function(data) {
      			auth.saveToken(data.token);
      		});
      };

      auth.logOut = function() {
      	$window.localStorage.removeItem('kyc-token');
      };

      return auth;
    }
  ]);






