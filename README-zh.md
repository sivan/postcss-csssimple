# PostCSS CSSSimple [![Build Status](https://travis-ci.org/sivan/postcss-csssimple.svg)](https://travis-ci.org/sivan/postcss-csssimple)

PostCSS CSSSimple 是一个 [PostCSS](https://github.com/postcss/postcss) 插件，帮你删除不必要的 CSS 来优化代码质量，并让你专注书写标准化代码而无需操心 IE bug。

## 改动
* 增加部分 IE6 Bugs 的处理；
* 优化插入声明函数，允许一次插多下；
* 优化插入声明判断，不重复插入已有声明；
* 去除 `-webkit-image-set` 相关功能，因为似乎只支持本地图片且文件夹结构有限制；
* 去除 `clear: fix` 和 `position: center` 两个 helper。

## 主要功能

### 修复常见 CSS 错误

* 删除浮动或绝对、固定定位时多余的盒模型设置；
* 删除绝对、固定定位时多余的浮动设置。

```css
/* Input example */
.foo {
    position: absolute;
    display: block;
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

### 功能兼容

* 强制给伪元素使用单冒号选择器 `:`；
* 兼容单行文字溢出自动显示「…」；
* 兼容透明度；
* 兼容 rgba 背景色。

```css
/* Input example */
.foo::before {
    position: fixed;
    float: left;
    content: '';
}
.bar {
    text-overflow: ellipsis;
    overflow: hidden;
    opacity: .8;
}
.baz {
    background: rgba(0, 0, 0, .2);
}
```

```css
/* Output example */
.foo:before {
    position: fixed;
    content: '';
}
.bar {
    text-overflow: ellipsis;
    overflow: hidden;
    _zoom: 1;
    white-space: nowrap;
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

## 使用方法

```js
postcss([require('postcss-csssimple')])
```

## 关于
项目源自一丝的 CSS Grace，我做了一些修改，原项目说明看 [CSS Grace](https://github.com/cssdream/cssgrace)。

##[Changelog](CHANGELOG.md)
##[License](LICENSE)

-- EOF --
