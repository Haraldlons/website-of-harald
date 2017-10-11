(function(){
	'use strict'
	/*Harald Code*/
angular.module("mainApp")
.controller("cvCtrl", ['$scope', function($scope){
	console.log("cvCtrl loaded")

	var vm = this;

	vm.melding = "Hei fra cvCtrl!";

}]); /*End homeCtrl*/



})(); /*End function scope*/