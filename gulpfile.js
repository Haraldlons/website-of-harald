var gulp = require('gulp'); /*En parameter, navnet til modulen du ønsker*/
var uglify = require("gulp-uglify");

// Styles
gulp.task('styles', function(){
	console.log("starting styles task");
});

// Scripts

gulp.task("scripts", function () {
	console.log("starting scripts task");

	return gulp.src("public/scripts/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("public/dist")); /*Saves it in the dist*/
});



// Images

gulp.task("images", function(){
	console.log("starting images task");
});

// Default -> 'gulp' or 'gulp default'

gulp.task('default', function(){
	console.log("This is default task.");
});