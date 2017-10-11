(function(){
	'use strict'
	/*Harald Code*/
angular.module("mainApp")
.controller("aboutCtrl", ['$scope', function($scope){
	console.log("aboutCtrl loaded")
	var vm = this;

	vm.melding = "Hei fra ABOUTCTRL";

}]); /*End homeCtrl*/



})(); /*End function scope*/