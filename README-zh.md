# PostCSS CSSSimple [![Build Status](https://travis-ci.org/sivan/postcss-csssimple.svg)](https://travis-ci.org/sivan/postcss-csssimple)

PostCSS CSSSimple 是一个 [PostCSS](https://github.com/postcss/postcss) 插件，它的主要功能有：

* 实现部分属性（text-overflow、RGBA 等）的 polyfills，补充了 Autoprefixer 不打算实现的功能（如 overflow-wrap、will-change）；
* 修复低版本 IE 下（至 IE6）常见的兼容性 bug；
* 删除 CSS 中不必要的代码来去除冗余代码。

建议搭配 [Autoprefixer](https://github.com/postcss/autoprefixer) 使用。

## 主要功能

### 功能兼容

* 强制给伪元素使用单冒号选择器 `:`；
* 兼容透明度；
* 兼容单行文字溢出自动显示「…」；
* 兼容 `overflow-wrap`；
* 兼容 `will-change` 属性；
* 兼容 rgba 背景色。

```css
/* Input example */
.foo::before {
    text-overflow: ellipsis;
    overflow: hidden;
}
.bar {
    opacity: .8;
}
.baz {
    background: rgba(0, 0, 0, .2);
}
```

```css
/* Output example */
.foo:before {
    text-overflow: ellipsis;
    overflow: hidden;
    _zoom: 1;
    white-space: nowrap;
}
.bar {
    opacity: .8;
    filter: alpha(opacity=80)\9;
}
.baz {
    background: rgba(0, 0, 0, .2);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#33000000", endColorstr="#33000000")\9;
}
```

### 解决常见 Bug

* 解决 IE6~7 `display: inline-block` bug；
* 解决 IE6 双边距 bug；
* 解决 IE6 `overflow: hidden` 失效 bug；

```css
/* Input example */
.foo {
    display: inline-block;
}
.bar {
    float: left;
    margin: 20px;
    overflow: hidden;
}
```

```css
/* Output example */
.foo {
    display: inline-block;
    *display: inline;
    *zoom: 1;
}
.bar {
    float: left;
    _display: inline;
    margin: 20px;
    overflow: hidden;
    _zoom: 1;
}
```

### 修复常见 CSS 错误

* 删除浮动或绝对、固定定位时多余的盒模型设置；
* 删除绝对、固定定位时多余的浮动设置。

```css
/* Input example */
.foo {
    position: absolute;
    display: inline-block;
}
.bar {
    float: left;
    display: block;
}
.baz {
    position: absolute;
    float: left;
}
```

```css
/* Output example */
.foo {
    position: absolute;
}
.bar {
    float: left;
}
.baz {
    position: absolute;
}
```

## 使用方法

[通过 npm 安装](https://www.npmjs.com/package/postcss-csssimple)后在 postcss 配置中载入 postcss-csssimple 插件即可。

```js
postcss([require('postcss-csssimple')])
```

## 关于
项目源自一丝的 CSS Grace，起初只是做了一些修改（去除了自定义语法的部分，不重复插入代码以及部分 hack 支持至 IE6 等），后来东西改的越来越多干脆重构了一遍。  
原项目说明看 [CSS Grace](https://github.com/cssdream/cssgrace)。

## [Changelog](CHANGELOG.md)  
## [License](LICENSE)

-- EOF --
