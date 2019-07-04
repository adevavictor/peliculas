var gulp = require('gulp'),
    connect = require('gulp-connect')
    jade = require('gulp-jade'),
    ngAnnotate = require('gulp-ng-annotate'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject');

/**
 * Conexión servidor
 */
gulp.task('connect', function() {
  connect.server({
     root: './build' 
  });
});
 
/**
 * Compilado index
 */
gulp.task('compilarIndex', function() {
  return gulp.src('./src/main/app/views/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./build'))
});

/**
 * Compilado vistas compartidas
 */
gulp.task('compilarVistasCompartidas', function() {
  return gulp.src('./src/main/app/views/partials/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./build/views/partials'))
});

/**
 * Compilado resto de vistas de la app
 */
gulp.task('compilarRestoVistas', function() {
  return gulp.src(['./src/main/app/views/*.jade', '!./src/main/app/views/index.jade'])
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./build/views'))
});

/**
 * Construcción de código JS de la App
 */
gulp.task('construirJsApp', function() {
  let dependenciasOrdenadas = [
    './src/main/app/app.module.js',
    './src/main/app/app.routing.js',
    './src/main/app/app.constants.js',
    './src/main/app/modules/*.js',
    './src/main/app/controllers/*.js',
    './src/main/app/services/*.js'
  ];

  return gulp.src(dependenciasOrdenadas)
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(babel({ presets: ['minify'] }))
    .pipe(gulp.dest('./build/js'));
});

/**
 * Copiado librerías JS
 */
gulp.task('copiarDependenciasJs', function() {
  let dependenciasOrdenadas = [
    './bower_components/angular/angular.min.js',
    './bower_components/angular-ui-router/release/angular-ui-router.min.js',
    './bower_components/ngstorage/ngStorage.min.js',
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/bootstrap/dist/js/bootstrap.min.js'
  ];

  return gulp.src(dependenciasOrdenadas)
      .pipe(gulp.dest('./build/js'));
});

/**
 * Copiado librerías CSS
 */
gulp.task('copiarDependenciasCss', function() {
  return gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest('./build/css'));
});

/**
 * Inyección de JS y CSS al index
 */
gulp.task('inyectarDependencias', function() { 
  let dependenciasOrdenadas = [
    './build/css/bootstrap.min.css',
    './build/js/jquery.min.js',
    './build/js/bootstrap.min.js',
    './build/js/angular.min.js',
    './build/js/angular-ui-router.min.js',
    './build/js/ngStorage.min.js',
    './build/js/app.js'
  ]
  return gulp.src('./build/index.html')
    .pipe(inject(gulp.src(dependenciasOrdenadas), { relative: true }))
    .pipe(gulp.dest('./build'));
});

/** 
 * Compila todas las plantillas Jade y las deposita en destino
 */
gulp.task('compilarJade', gulp.series('compilarIndex', 'compilarVistasCompartidas', 'compilarRestoVistas'));

/**
 * Construye e inyecta todo el JS y CSS de la App
 */
gulp.task('construccionContenido', gulp.series('construirJsApp', 'copiarDependenciasJs', 'copiarDependenciasCss', 'inyectarDependencias'));

/**
 * Construye toda la App
 */
gulp.task('construirApp', gulp.series('compilarJade', 'construccionContenido'));