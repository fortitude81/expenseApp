angular.module('rcForm', [])
    .directive(rcSubmitDirective);

var app = angular.module('expenseMgmt', ['ngRoute','rcForm', 'ui.bootstrap', 'ui.utils']);

app.config(function ($routeProvider) {
    $routeProvider
		.when('/', {
			templateUrl: './partials/login.html'
		})
		.when('/expenses', {
      resolve: {
        "check": function($location, $rootScope) {
          if (!$rootScope.loggedIn) {
            $location.path('/');
          }
        }
      },
      templateUrl: './partials/expenses.html'
    })
    .otherwise({
      redirectTo: '/'
    });
 });
