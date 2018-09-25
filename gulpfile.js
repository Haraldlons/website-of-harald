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
var del = require("del");
var zip = require("gulp-zip");

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
var DIST_PATH = "distribution"
var SCRIPTS_PATH = "development/scripts/**/*.js";
var CSS_PATH = "development/css/**/*.css";
var TEMPLATES_PATH = "templates/**/*.hbs";
var IMAGES_PATH = "development/images/**/*.{png,jpeg,jpg,svg,gif}";
var HTML_PATH = "development/html/**/*html"
var NODE_MODULES_PATH = "node_modules/**/*"


// All scripts and SCSS
var scripts = require('./scripts');
var scripts_dependencies = require('./scripts_dependencies');
var styles = require('./styles');
var styles_dependencies = require('./styles_dependencies');

// Styles
// gulp.task('styles', function(){
// 	console.log("starting styles task");

// 	// Først reset.css SÅ CSS_path -> viktig rekkefølge
// // 	return gulp.src(['development/css/reset.css', CSS_PATH])
// // 		.pipe(plumber(function(err){
// // 			console.log("Styles Task Error: ");
// // 			console.log(err);
// // 			this.emit("end");
// // 		}))
// // 		.pipe(sourcemaps.init()) /*Know css-files before minify*/
// // 		.pipe(autoprefixer())
// // 		.pipe(concat('styles.css'))
// // 		.pipe(minifyCss())
// // 		.pipe(sourcemaps.write())
// // 		.pipe(gulp.dest(DIST_PATH))
// // 		.pipe(livereload());
// });

// Styles DEPENDENCIES
gulp.task('styles_dependencies', function(){
	console.log("starting styles DEPENDENCIES task");

	// Først reset.css SÅ CSS_path -> viktig rekkefølge
	return gulp.src(styles_dependencies)
		.pipe(plumber(function(err){
			console.log("Styles Task Error _dependencies: ");
			console.log(err);
			this.emit("end");
		}))
		.pipe(sourcemaps.init()) /*Know css-files before minify*/
		.pipe(autoprefixer())
		.pipe(concat('styles_dependencies.css'))
		// .pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});


// Styles for SCSS
gulp.task('styles', function(){
	console.log("starting styles task");

	// Først reset.css SÅ CSS_path -> viktig rekkefølge
	return gulp.src(styles)
		.pipe(plumber(function(err){
			console.log("Styles Task Error: ");
			console.log(err);
			this.emit("end");
		}))
		.pipe(sourcemaps.init()) /*Know css-files before minify*/
		.pipe(autoprefixer())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// // Styles for LESS
// gulp.task('styles', function(){
// 	console.log("starting styles task");

// 	// Først reset.css SÅ CSS_path -> viktig rekkefølge
// 	return gulp.src("development/less/styles.less")
// 		.pipe(plumber(function(err){
// 			console.log("Styles Task Error: ");
// 			console.log(err);
// 			this.emit("end");
// 		}))
// 		.pipe(sourcemaps.init()) /*Know css-files before minify*/
// 		.pipe(less({
// 			plugins: [lessAutoprefix]
// 		}))
// 		.pipe(minifyCss())
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest(DIST_PATH))
// 		.pipe(livereload());
// });

// Scripts
gulp.task("scripts_self_wrote", function () {
	console.log("Scripts task: uglifying scripts_self_wrote .js file");

	return gulp.src(scripts)
		.pipe(plumber(function(err){
			console.log("Scripts Tasks error in scripts_self_wrote: ");
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

// Scripts for script_dependencies
gulp.task("concat_script_dependencies", function () {
	console.log("Scripts task: concat_script_dependencies .js file");

	return gulp.src(scripts_dependencies)
		.pipe(plumber(function(err){
			console.log("Scripts Tasks error in concat_script_dependencies: ");
			console.log(err);
			this.emit('end'); /*I think it will just skip rest of function*/
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat("scripts_dependencies.js"))
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

// gulp.task('html', function() {
//     return gulp.src('./src/templates/**/*.html')
//         .pipe(gulp.dest('./dist/'))
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// });

// HTML
gulp.task("html", function(){
	// Komprimering av bilder. Rundt 70%. Legges i dist/images mappe.
	return gulp.src(HTML_PATH)
		.pipe(gulp.dest(DIST_PATH + "/html"))
		.pipe(livereload());
});


// Sletter hele dist folder slik at hver gang vi starter default så starter 
// vi med en "ren" folder og ikke noe vi har igjen fra tidligere.
gulp.task("clean", function(){
	return del.sync([
			/*"distribution/images", Uncomment this when making new images in default*/
			"distribution/html", 
			"distribution/*.js",
			"distribution/*.css",
			"distribution/*.html",
			"distribution/node_modules",
			// "dist/templates.js"
			// DIST_PATH
		]);
});

// Default -> 'gulp' or 'gulp default'
gulp.task('default', ['clean'/*,'images'*/,'templates','makeIndex','styles_dependencies','styles', 'concat_script_dependencies', 'scripts_self_wrote','html' ], function(){
	console.log("This is default task.");
});

gulp.task("export", function(){
	return gulp.src("development/**/*")
		.pipe(zip("website.zip"))
		.pipe(gulp.dest("./"))
});

gulp.task("watch", ['default'], function(){
	console.log("watch started");
	require("./server.js"); /*kjører koden*/
	livereload.listen();
	gulp.watch(scripts, ['scripts_self_wrote']); /*liste over tasks som skal kjøres om det skjer noen endringer*/
	// gulp.watch(CSS_PATH, ['styles']);
	gulp.watch(styles, ["styles"]); /*For SCSS*/
	gulp.watch(HTML_PATH, ["html"]); /*For SCSS*/
	gulp.watch("development/*.html", ["makeIndex"]); /*For SCSS*/
	// gulp.watch("development/less/**/*.less", ["styles"]); /*For LESS*/
	gulp.watch(TEMPLATES_PATH, ["templates"]);
});

gulp.task("makeIndex", function(){
	console.log("trying to copy index.html from development folder to distribution folder");
	return gulp.src("development/*.html")
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

// gulp.task("moveNodeModulesToDistribution", function(){
// 	console.log("trying to copy node_modules into distribution folder");
// 	return gulp.src(NODE_MODULES_PATH)
// 		.pipe(gulp.dest(DIST_PATH + "/node_modules"))
// 		.pipe(livereload());
// });