const RESTSERVER = "http://localhost:3000";

var app = angular.module('meancart', []);
app.controller('listController', function($scope, $http){
    $http.get(RESTSERVER+"/products").success( function( response ){
      $scope.title= "MEAN Cart!";
      $scope.name= "List of Products";
      console.log(response.products)
      $scope.list = response.products;

    });
} );
