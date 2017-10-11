(function(){
	'use strict'
	/*Harald Code*/
angular.module("mainApp")
.controller("blogsCtrl", ['$scope', function($scope){
	console.log("blogsCtrl loaded")
	var vm = this;

	vm.melding = "Hei fra blogsCtrl";

}]); /*End homeCtrl*/



})(); /*End function scope*/