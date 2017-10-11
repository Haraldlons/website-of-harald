

/*
*	The application main module
*	@module: mainApp
*/

(function() {
'use strict';


var app = angular.module('mainApp', [
		'ngAnimate',
		'ngAria',
		'ngCookies',
		'ngMessages',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		// 'ngTouch', //not compatible with angular-material
		'ui.router',
		'ngMaterial',
		// 'angularFileUpload',
		// 'textAngular',
		// 'firebase'
	])
	// .config(configure)
	

	// function configure($stateProvider, $urlRouterProvider) {
	// 	// $urlRouterProvider.otherwise('/');

	// 			// Main navigation pages
	// 	$stateProvider
	// 		.state('home', {
	// 			url: '/',
	// 			templateUrl: 'controllers/home.html',
	// 			controller: 'homeCtrl as vm'
	// 		});
		
	// }
	// configure.$inject = ['$stateProvider', '$urlRouterProvider'];




	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');


		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'html/home.html',
				controller: 'homeCtrl as vm'
			})
			.state('about', {
				url: '/about',
				templateUrl: 'html/about.html',
				controller: 'aboutCtrl as vm'
			})
			.state('contact', {
				url: '/contact',
				templateUrl: 'html/contact.html',
				controller: 'contactCtrl as vm'
			})
			.state('projects', {
				url: '/projects',
				templateUrl: 'html/projects.html',
				controller: 'projectsCtrl as vm'
			})
			.state('cv', {
				url: '/cv',
				templateUrl: 'html/cv.html',
				controller: 'cvCtrl as vm'
			})
			.state('blogs', {
				url: '/blogs',
				templateUrl: 'html/blogs.html',
				controller: 'blogsCtrl as vm'
			})
			.state('schoolwork', {
				url: '/schoolwork',
				templateUrl: 'html/schoolwork.html',
				controller: 'schoolworkCtrl as vm'
			});

	}]); /*End config*/

})();
