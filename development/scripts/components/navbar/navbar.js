(function(){
	'use strict';

	/*
	*	@ngdoc function
	*	@name etApp.directive:navbar
	*	@description
	*	# Components
	*	Components for the etApp
	*/
	angular.module('mainApp')
		.directive('navbar', navbar);

		/*@ngInject*/
		function navbar(){
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'html/navbar.html',
				controller: 'navbarCtrl as vm'
			};
		}
		navbar.$inject = [];
})();
