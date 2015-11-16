var app = angular.module('meancart', [
  'ngRoute',
  'controllers',
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/list', {
        templateUrl: '/template/list.html',
        controller: 'listController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
