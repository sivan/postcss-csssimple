# PostCSS CSSSimple [![Build Status](https://travis-ci.org/sivan/postcss-csssimple.svg)](https://travis-ci.org/sivan/postcss-csssimple)

A [PostCSS](https://github.com/postcss/postcss) plugin makes your CSS codes simple and compatible. Fix common browser bugs and remove unnecessary code.

[中文说明 →](README-zh.md)

## Features
### Remove unnecessary code

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

### Useful mixins

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

## Usage

```js
postcss([require('postcss-csssimple')])
```

## About
This project is modified from [CSSGrace](https://github.com/cssdream/cssgrace) and add some features to fix common IE bugs, and CSSSimple doesn't support custom syntax to keep the code follow standards.

## [Changelog](CHANGELOG.md)  
## [License](LICENSE)

-- EOF --
