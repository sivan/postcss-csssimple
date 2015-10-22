# PostCSS CSSSimple [![Build Status](https://travis-ci.org/sivan/postcss-csssimple.svg)](https://travis-ci.org/sivan/postcss-csssimple)

A [PostCSS](https://github.com/postcss/postcss) plugin makes your CSS codes simple and compatible. It fix common browser bugs, add useful polyfills and remove unnecessary code. [中文说明](README-zh.md)

* Useful polyfill to complete `text-overflow`, RGBA etc. Especially contains mix-ins which Autoprefixer won't support(Convert `::before` to `:before` or add `word-wrap` with `overflow-wrap`).
* Fix common IE6~8 bugs;
* Remove unneccessary code.

Recommend use CSS-Simple WITH [Autoprefixer](https://github.com/postcss/autoprefixer).

## Features

### Useful mixins

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

### Fix common bugs
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

### Remove unnecessary code

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

## Usage

```js
postcss([require('postcss-csssimple')])
```

## About
This project is a fork from [CSSGrace](https://github.com/cssdream/cssgrace) and add new features to fix common IE bugs, and CSS-Simple doesn't support custom syntax to keep the code follow standards.

## [Changelog](CHANGELOG.md)  
## [License](LICENSE)

-- EOF --
