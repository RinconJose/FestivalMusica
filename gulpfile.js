const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require( 'sass' ));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer'); // Va segurarse de funcionar en el navegador que le digas
const cssnano = require('cssnano'); // lo comprime de una mejor manera
const postcss = require('gulp-postcss'); // le hace algunas transformaciones por medio de los dos anterioes
const sourcemaps = require('gulp-sourcemaps');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//Javascript
const terser = require('gulp-terser-js');

function css( done ) {

    src('./src/scss/**/*.scss') //Identificar el archivo .scss a compilar
        .pipe( sourcemaps.init() )
        .pipe( plumber() ) //Evita que se detenga la ejecución del gulp (workflow) al toparse con un error
        .pipe( sass() ) //Compilar el archivo .scss a .css
        .pipe( postcss([autoprefixer(), cssnano()]))
        .pipe( sourcemaps.write('.') )
        .pipe( dest('./build/css') ) // Almacenarlo en el disco duro
    done();
}

function javascript( done ) {
    
    src( './src/js/**/*.js' )
        .pipe( sourcemaps.init() )
        .pipe( terser() )
        .pipe( sourcemaps.write('.') )
        .pipe( dest('./build/js') )
    done();
}

function imagenes( done ) {

    const opciones = {
        optimizationLevel: 3
    }

    src('./src/img/**/*{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('./build/img') )
    done();
}

function versionWebp( done ) {

    const opciones = {
        quality: 50
    };

    src('./src/img/**/*{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('./build/img') )
    done();
}

function versionAvif( done ) {

    const opciones = {
        quality: 50
    };

    src('./src/img/**/*{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('./build/img') )
    done();
}

function dev( done ) {
    watch( './src/scss/**/*.scss', css );
    watch( './src/js/**/*.js', javascript );
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev );