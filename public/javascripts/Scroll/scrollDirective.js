/* /javascripts/Scroll/scrollDirective.js */

angular
  .module('NBA5')
  .directive('scroll', ['$window', function($window) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var offsetTop = element[0].offsetTop,
            offsetHeight = element[0].offsetHeight;
            console.log(offsetTop);

          checkScene();
  
          angular.element($window).bind("scroll", function() {
            checkScene();
          });
  
          function checkScene() {
            var bodyScrollTop = $window.scrollY + 400;
  
            if (bodyScrollTop >= offsetTop) {
              // element.addClass('scroll-fadein');
              // element.style.css();
            } else {
              element.removeClass('scroll-fadein');
            }
          }
        }
      };
    }]);