var debug = require('./log')('debug');

var scrapeUtils = {
  waitForTextChange: function (page, selector, cb) {
    var current = this.getString(page, selector);
    var intervalId = setInterval(function () {
      var now = this.getString(page, selector);
      debug.log('Waiting for text change...');
      if (current !== now) {
        debug.log('Text changed! ' + now);
        clearInterval(intervalId);
        cb(now);
      }
    }.bind(this), 200);
  },
  waitFor: function (page, fn, cb) {
    var intervalId = setInterval(function () {
      if (page.evaluate(fn)) {
        clearInterval(intervalId);
        cb();
      }
    }, 200);
  },
  getString: function (page, selector) {
    return page.evaluate(function (s) {
      var node = document.querySelector(s);
      return (node ? node.innerText : '');
    }, selector);
  },
  exists: function (page, selector) {
    return page.evaluate(function (s) {
      return document.querySelectorAll(s).length > 0;
    }, selector);
  }
};

module.exports = scrapeUtils;
