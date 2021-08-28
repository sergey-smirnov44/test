// Определяем константы Gulp
const {src, dest, parallel, series, watch} = require('gulp');
// Подключаем Browsersync
const browserSync = require('browser-sync').create();
// Подключаем gulp-concat
const concat = require('gulp-concat');
// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;
// Подключаем модули gulp-sass и gulp-less
const scss = require('gulp-sass')(require('sass'));
// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');
// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');
// Подключаем compress-images для работы с изображениями
const imagecomp = require('compress-images');
// Подключаем модуль del
const del = require('del');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fonter = require('gulp-fonter');
const fs = require('fs')


// Определяем логику работы Browsersync
function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        server: {baseDir: 'app/'}, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true, // Режим работы: true или false
        open: false,
        watch: true
    })
}


function scripts() {
    return src([ // Берем файлы из источников
        'app/js/app.js', // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
    ])
        .pipe(concat('app.min.js')) // Конкатенируем в один файл
        .pipe(uglify()) // Сжимаем JavaScript
        .pipe(dest('app/js/')) // Выгружаем готовый файл в папку назначения
        .pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}



async function images() {
    imagecomp(
        "app/img/src/**/*", // Берём все изображения из папки источника
        "app/img/dest/", // Выгружаем оптимизированные изображения в папку назначения
        {compress_force: false, statistic: true, autoupdate: true}, false, // Настраиваем основные параметры
        {jpg: {engine: "mozjpeg", command: ["-quality", "75"]}}, // Сжимаем и оптимизируем изображеня
        {png: {engine: "pngquant", command: ["--quality=75-100", "-o"]}},
        {svg: {engine: "svgo", command: "--multipass"}},
        {gif: {engine: "gifsicle", command: ["--colors", "64", "--use-col=web"]}},
        function (err, completed) { // Обновляем страницу по завершению
            if (completed === true) {
                browserSync.reload()
            }
        }
    )
}

function cleanimg() {
    return del('app/img/dest/**/*', {force: true}) // Удаляем все содержимое папки "app/images/dest/"
}

function fonts() {
     src('app/fonts/*.ttf')
        .pipe(ttf2woff())
        .pipe(dest('app/fonts/'))
   return src('app/fonts/*.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts/'))
}

function otf2ttf() {
    return src('app/fonts/*otf')
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest('app/fonts/'))
}


function styles() {
    return src('app/scss/*.scss') // Выбираем источник
        .pipe(scss({outputStyle: "expanded"})).on('error', scss.logError)
        .pipe(concat('app.min.css')) // Конкатенируем в файл app.min.js
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        })) // Создадим префиксы с помощью Autoprefixer
        .pipe(cleancss({level: {1: {specialComments: 0}}/* , format: 'beautify' */})) // Минифицируем стили
        .pipe(dest('app/css/')) // Выгрузим результат в папку "app/css/"
        .pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function startwatch() {
    // Мониторим файлы HTML на изменения
    watch('app/**/*.html',{usePolling: true}).on('change', browserSync.reload);
    // Мониторим файлы препроцессора на изменения
    watch('app/**/*.scss',{usePolling: true}, styles).on('all', browserSync.reload);
    // Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
    watch(['app/**/*.js', 'app/**/*.json', '!app/**/*.min.js'], scripts);
    // Мониторим папку-источник изображений и выполняем images(), если есть изменения
    watch('app/images/src/**/*',{usePolling: true}, images);
}

function buildcopy() {
    return src([ // Выбираем нужные файлы
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/img/dest/**/*',
        'app/**/*.html',
        'app/fonts/*.woff',
        'app/fonts/*.woff2',
    ], {base: 'app'}) // Параметр "base" сохраняет структуру проекта при копировании
        .pipe(dest('dist')) // Выгружаем в папку с финальной сборкой
}

function cleandist() {
    return del('dist/**/*', {force: true}) // Удаляем все содержимое папки "dist/"
}

// Экспортируем функцию browsersync() как таск browsersync. Значение после знака = это имеющаяся функция.
exports.browsersync = browsersync;
// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;
// Экспортируем функцию styles() в таск styles
exports.styles = styles;
// Экспорт функции images() в таск images
exports.images = images;
// Экспортируем функцию cleanimg() как таск cleanimg
exports.cleanimg = cleanimg;
exports.fonts = fonts;
// exports.fontsStyle = fontsStyle;
// Экспортируем дефолтный таск с нужным набором функций
// exports.default = parallel(styles, scripts, browsersync, startwatch);
// // Создаем новый таск "build", который последовательно выполняет нужные операции
// exports.build = series(cleandist, styles, scripts, images, buildcopy, fonts, otf2ttf, fontsStyle);
exports.build = series(cleandist, parallel(styles, scripts, images, buildcopy,buildcopy))
exports.default = parallel(styles, scripts, images, browsersync, startwatch);
