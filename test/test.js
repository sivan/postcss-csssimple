var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function(input, output, opts, done) {
  postcss([plugin(opts)]).process(input).then(function(result) {
    expect(result.css).to.eql(output);
    expect(result.warnings()).to.be.empty;
    done();
  }).catch(function(error) {
    done(error);
  });
};

describe('CSS Simple Tests: ', function() {
  it('Remove unnecessary display: inline-block with position: absolute|fixed', function(done) {
    test(
      '.test1 { position: absolute; display: inline-block; } .test2 { position: fixed; display: inline-block; } ' +
        '.test3 { position: relative; display: block; } .test4 { position: static; display: block; }',
      '.test1 { position: absolute; } .test2 { position: fixed; } ' +
        '.test3 { position: relative; display: block; } .test4 { position: static; display: block; }',
      { }, done);
  });

  it('Remove unnecessary display: block with float: left|right', function(done) {
    test(
      '.test1 { float: left; display: block; } .test2 { float: right; display: inline-block; } ' +
        '.test3 { float: none; display: none; }',
      '.test1 { float: left; display: block; } .test2 { float: right; } ' +
        '.test3 { float: none; display: none; }',
      { }, done);
  });

  it('Remove unnecessary float: left with position: absolute|fixed', function(done) {
    test(
      '.test1 { float: left; position: absolute; } .test2 { float: left; position: fixed; } ' +
        '.test3 { position: relative; float: left; }',
      '.test1 { position: absolute; } .test2 { position: fixed; } ' +
        '.test3 { position: relative; float: left; }',
      { }, done);
  });

  it('Convert pseudo elements to single colon', function(done) {
    test(
      '.test1::before { content: ""; } .test2::first-letter { float: left; font-size: 3em; }',
      '.test1:before { content: ""; } .test2:first-letter { float: left; font-size: 3em; }',
      { }, done);
  });

  it('Use text-overflow: ellipsis', function(done) {
    test(
      '.test1 { text-overflow: ellipsis; } .test2 { text-overflow: ellipsis; overflow: auto; } ' +
        '.test3 { text-overflow: ellipsis; white-space: normal; }',
      '.test1 { text-overflow: ellipsis; white-space: nowrap; overflow: hidden; _zoom: 1; } ' +
        '.test2 { text-overflow: ellipsis; white-space: nowrap; overflow: hidden; _zoom: 1; } ' +
        '.test3 { text-overflow: ellipsis; overflow: hidden; _zoom: 1; white-space: nowrap; }',
      { }, done);
  });

  it('Use opacity', function(done) {
    test(
      '.test { opacity: .5; }',
      '.test { opacity: .5; filter: alpha(opacity=50)\\9; }',
      { }, done);
  });

  it('Use RGBA Background color', function(done) {
    test(
      '.test1 { background: rgba(0, 0, 0, .2); } .test2 { background-color: rgba(0, 0, 0, .2); }',
      '.test1 { background: rgba(0, 0, 0, .2); filter: progid:DXImageTransform.Microsoft.gradient' +
        '(startColorstr="#33000000", endColorstr="#33000000")\\9; } ' +
        '.test2 { background-color: rgba(0, 0, 0, .2); ' +
        'filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#33000000", endColorstr="#33000000")\\9; }',
      { }, done);
  });

  it('Fix IE6~7 inline-block', function(done) {
    test(
      '.test1 { display: inline-block; } ' +
        '.test2 { display: inline-block; zoom: 1; } ' +
        '.test3 { display: inline-block; *display: inline; *zoom: 1; }',
      '.test1 { display: inline-block; *zoom: 1; *display: inline; } ' +
        '.test2 { display: inline-block; *display: inline; zoom: 1; } ' +
        '.test3 { display: inline-block; *display: inline; *zoom: 1; }',
      { }, done);
  });

  it('Fix IE6 double margin bug', function(done) {
    test(
      '.test1 { float: left; margin: 20px; } ' +
        '.test2 { float: right; margin: 0; } ' +
        '.test3 { float: none; margin: 20px; }',
      '.test1 { float: left; _display: inline; margin: 20px; } ' +
        '.test2 { float: right; margin: 0; } ' +
        '.test3 { float: none; margin: 20px; }',
      { }, done);
  });

  it('Fix IE6 overflow: hidden bug', function(done) {
    test(
      '.test1 { overflow: hidden; } ' +
        '.test2 { overflow: hidden; zoom: 1; } ' +
        '.test3 { overflow: visible; }',
      '.test1 { overflow: hidden; _zoom: 1; } ' +
        '.test2 { overflow: hidden; zoom: 1; } ' +
        '.test3 { overflow: visible; }',
      { }, done);
  });
});
