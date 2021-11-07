const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require( 'sass' ));
const plumber = require('gulp-plumber');

function css( done ) {

    src('./src/scss/**/*.scss') //Identificar el archivo .scss a compilar
        .pipe( plumber() ) //Evita que se detenga la ejecución del gulp (workflow) al toparse con un error
        .pipe( sass() ) //Compilar el archivo .scss a .css
        .pipe( dest('./build/css') ) // Almacenarlo en el disco duro

    done();
}

function dev( done ) {
    watch( './src/scss/**/*.scss', css );
    done();
}

exports.css = css;
exports.dev = dev;