var gulp = require('gulp'); /*Par: til modulen du ønsker*/
var uglify = require("gulp-uglify");
var livereload = require("gulp-livereload");
var concat = require("gulp-concat"); /*Flere filer sammen*/
var minifyCss = require("gulp-minify-css");
var autoprefixer = require("gulp-autoprefixer"); /*Specify which browse. Vendor*/
var plumber = require("gulp-plumber"); /*Handles errors*/
var sourcemaps = require("gulp-sourcemaps"); /*Easy debugging in chrome inspect*/
var sass = require("gulp-sass"); 
var babel = require("gulp-babel"); /*Get newer versions to work. */

// Less plugins
var less = require("gulp-less");
var LessAutoprefix = require("less-plugin-autoprefix")
var lessAutoprefix = new LessAutoprefix({
	browsers: ['last 2 versions']
});

// Handlebars plugins
var handlebars = require("gulp-handlebars");
var handlebarsLib = require("handlebars");
var declare = require("gulp-declare");
var wrap = require("gulp-wrap"); /*Wrap our files in a set of codes*/

// Image compression
var imagemin = require("gulp-imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminJpegRecompress = require("imagemin-jpeg-recompress")


// File Paths
var DIST_PATH = "public/dist"
var SCRIPTS_PATH = "public/scripts/**/*.js";
var CSS_PATH = "public/css/**/*.css";
var TEMPLATES_PATH = "templates/**/*.hbs";
var IMAGES_PATH = "public/images/**/*.{png,jpeg,jpg,svg,gif}";

// // Styles
// gulp.task('styles', function(){
// 	console.log("starting styles task");

// 	// Først reset.css SÅ CSS_path -> viktig rekkefølge
// 	return gulp.src(['public/css/reset.css', CSS_PATH])
// 		.pipe(plumber(function(err){
// 			console.log("Styles Task Error: ");
// 			console.log(err);
// 			this.emit("end");
// 		}))
// 		.pipe(sourcemaps.init()) /*Know css-files before minify*/
// 		.pipe(autoprefixer())
// 		.pipe(concat('styles.css'))
// 		.pipe(minifyCss())
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest(DIST_PATH))
// 		.pipe(livereload());
// });

// // Styles for SCSS
// gulp.task('styles', function(){
// 	console.log("starting styles task");

// 	// Først reset.css SÅ CSS_path -> viktig rekkefølge
// 	return gulp.src("public/scss/styles.scss")
// 		.pipe(plumber(function(err){
// 			console.log("Styles Task Error: ");
// 			console.log(err);
// 			this.emit("end");
// 		}))
// 		.pipe(sourcemaps.init()) /*Know css-files before minify*/
// 		.pipe(autoprefixer())
// 		.pipe(sass({
// 			outputStyle: 'compressed'
// 		}))
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest(DIST_PATH))
// 		.pipe(livereload());
// });

// Styles for LESS
gulp.task('styles', function(){
	console.log("starting styles task");

	// Først reset.css SÅ CSS_path -> viktig rekkefølge
	return gulp.src("public/less/styles.less")
		.pipe(plumber(function(err){
			console.log("Styles Task Error: ");
			console.log(err);
			this.emit("end");
		}))
		.pipe(sourcemaps.init()) /*Know css-files before minify*/
		.pipe(less({
			plugins: [lessAutoprefix]
		}))
		.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Scripts
gulp.task("scripts", function () {
	console.log("Scripts task: uglifying .js file");

	return gulp.src(SCRIPTS_PATH)
		.pipe(plumber(function(err){
			console.log("Scripts Tasks error: ");
			console.log(err);
			this.emit('end'); /*I think it will just skip rest of function*/
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify()) 
		.pipe(concat("scripts.js"))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Images
gulp.task("images", function(){
	// Komprimering av bilder. Rundt 70%. Legges i dist/images mappe.
	return gulp.src(IMAGES_PATH)
		.pipe(imagemin(
				[
					imagemin.gifsicle(),
					imagemin.jpegtran(),
					imagemin.optipng(),
					imagemin.svgo(),
					imageminPngquant(),
					imageminJpegRecompress()
				]
			))
		.pipe(gulp.dest(DIST_PATH + "/images"))
});

gulp.task("templates", function(){
	return gulp.src(TEMPLATES_PATH)
		.pipe(handlebars({
			handlebars: handlebarsLib
		})) /*Compile them as handlebars templates*/
		.pipe(wrap("Handlebars.template(<%= contents %>)")) /*Wraps the current content inside a string*/
		.pipe(declare({
			namespace: "templates",
			noRedeclare: true /*Im templates allerede finnes vil den ikke bli redefinert*/
		})) /*Deklarere en template variabel vi kan bruke inside javascript*/
		.pipe(concat("templates.js")) /*Navnet på filen som kommer i dist. Må huske å inkludere den i index.html*/
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// Default -> 'gulp' or 'gulp default'

gulp.task('default', ['images','templates','styles','scripts' ], function(){
	console.log("This is default task.");
});

gulp.task("watch", ['default'], function(){
	console.log("watch started");
	require("./server.js"); /*kjører koden*/
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']); /*liste over tasks som skal kjøres om det skjer noen endringer*/
	// gulp.watch(CSS_PATH, ['styles']);
	// gulp.watch("public/scss/**/*.scss", ["styles"]); /*For SCSS*/
	gulp.watch("public/less/**/*.less", ["styles"]); /*For LESS*/
	gulp.watch(TEMPLATES_PATH, ["templates"]);

});
