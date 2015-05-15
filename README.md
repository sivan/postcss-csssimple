# CSS Simple

拿一丝的 CSS Grace 改的，原项目说明看 [CSS Grace](https://github.com/cssdream/cssgrace)

## 改动
* 增加了解决部分 IE6 Bugs 的处理；
* 优化了插入声明函数，允许一次插多下；
* 优化了插入声明判断，不重复插入已有声明；
* 去除了 `-webkit-image-set` 相关功能，因为似乎只支持本地图片且文件夹结构有限制；
* 去除了 `clear: fix` 和 `position: center` 两个 helper。

## 主要功能

### 修复常见 CSS 错误
* 删除浮动或绝对、固定定位时多余的盒模型设置；
* 删除绝对、固定定位时多余的浮动设置。

### 功能兼容
* 强制给伪元素使用单冒号选择器 `:`；
* 兼容单行文字溢出自动显示「…」；
* 兼容透明度；
* 兼容 rgba 背景色。

### 解决常见 Bug
* 解决 IE6~7 `display: inline-block` bug；
* 解决 IE6 双边距 bug；
* 解决 IE6 `overflow: hidden` 失效 bug；

## 使用方法

### with Gulp

```bash
npm install gulp-postcss --save-dev
```

```js
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var csssimple = require('csssimple');

gulp.task('default', function () {
    var processors = [
        require('autoprefixer')('last 1 version'),
        require('cssgrace')
    ];

    return gulp.src('src/css/input.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('build/css'));
});
gulp.watch('src/*.css', ['default']);
```

谨慎使用，怕有问题建议[正版](https://github.com/cssdream/cssgrace)。

## [Changelog](CHANGELOG.md)
## [License](LICENSE)

-- EOF --



