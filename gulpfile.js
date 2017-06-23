var gulp = require('gulp'); /*Par: til modulen du ønsker*/
var uglify = require("gulp-uglify");
var livereload = require("gulp-livereload");
var concat = require("gulp-concat");
var minifyCss = require("gulp-minify-css");

// File Paths
var DIST_PATH = "public/dist"
var SCRIPTS_PATH = "public/scripts/**/*.js";
var CSS_PATH = "public/css/**/*.css";


// Styles
gulp.task('styles', function(){
	console.log("starting styles task");

	// Først reset.css SÅ CSS_path -> viktig rekkefølge
	return gulp.src(['public/css/reset.css', CSS_PATH])
		.pipe(concat('styles.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Scripts
gulp.task("scripts", function () {
	console.log("Scripts task: uglifying .js file");

	return gulp.src(SCRIPTS_PATH)
		.pipe(uglify()) 
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());

});

// Images
gulp.task("images", function(){
	console.log("starting images task");
});

// Default -> 'gulp' or 'gulp default'

gulp.task('default', function(){
	console.log("This is default task.");
});

gulp.task("watch", function(){
	console.log("watch started");
	require("./server.js"); /*kjører koden*/
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']); /*liste over tasks som skal kjøres om det skjer noen endringer*/
	gulp.watch(CSS_PATH, ['styles']);


});
