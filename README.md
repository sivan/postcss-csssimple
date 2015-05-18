# PostCSS CSSSimple [![Build Status][ci-img]][ci]

[PostCSS] plugin that makes you write CSS simple..

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/sivan/postcss-csssimple.svg
[ci]:      https://travis-ci.org/sivan/postcss-csssimple

[README-zh](README-zh.md)

```css
.foo {
    /* Input example */
    display: inline-block;
}
```

```css
.foo {
    /* Output example */
    display: inline-block;
    *display: inline;
    *zoom: 1;
}
```

## Usage

```js
postcss([ require('postcss-csssimple') ])
```

See [PostCSS] docs for examples for your environment.
