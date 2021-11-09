const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require( 'sass' ));
const plumber = require('gulp-plumber');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ) {

    src('./src/scss/**/*.scss') //Identificar el archivo .scss a compilar
        .pipe( plumber() ) //Evita que se detenga la ejecución del gulp (workflow) al toparse con un error
        .pipe( sass() ) //Compilar el archivo .scss a .css
        .pipe( dest('./build/css') ) // Almacenarlo en el disco duro

    done();
}

function imagenes( done ) {

    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}

function versionWebp( done ) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}

function versionAvif( done ) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
}

function dev( done ) {
    watch( './src/scss/**/*.scss', css );
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, dev );