const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const minify = require("gulp-minify");
const cleanCss = require("gulp-clean-css");

// Development Tasks
gulp.task("sass", function () {
  return gulp
    .src("src/scss/**/*.scss") // Gets all files ending with .scss in src/scss and children dirs
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("src/css")); // Outputs it in the css folder
});

// Watchers
gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
});

// Gulp task to minify CSS files
gulp.task("minifycss", function () {
  return (
    gulp
      .src(["src/css/style.css"])
      // Compile SASS files
      .pipe(
        sass({
          precision: 10,
          includePaths: ["."],
          onError: console.error.bind(console, "Sass error:"),
        })
      )
      .pipe(concat("bundle.min.css"))

      .pipe(cleanCss())
      // Output
      .pipe(gulp.dest("src/css"))
  );
});

// Gulp task to minify JavaScript files
gulp.task("minifyjs", function () {
  return (
    gulp
      .src(["src/js/index.js"])
      // Minify the file
      .pipe(concat("bundle.min.js"))
      .pipe(
        minify({
          ext: {
            min: ".js",
          },
          noSource: true,
        })
      )
      // Output
      .pipe(gulp.dest("src/js"))
  );
});
