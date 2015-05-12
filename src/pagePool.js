var Q = require('q');
var webpage = require('webpage');

var PagePool = function (numPages) {
	this.availablePages = [];

	while (numPages-- > 0) {
		this.availablePages.push(webpage.create());
	}
};

PagePool.prototype.acquire = function () {
	var deferred = Q.defer();
  if (this.destroyed) {
    deferred.reject();
  } else {
    var intervalId = setInterval(function () {
      if (this.availablePages.length) {
        clearInterval(intervalId);
        deferred.resolve(this.availablePages.pop());
      }
    }.bind(this), 200);  
  }
  
  return deferred.promise;
};

PagePool.prototype.release = function (page) {
  this.availablePages.push(page);
  
  if (this.destroyed) {
    page.close();
  }
};

PagePool.prototype.destroy = function () {
  this.availablePages.forEach(function (p) {
    p.close();
  });
  
  this.destroyed = true;
};

module.exports = PagePool;