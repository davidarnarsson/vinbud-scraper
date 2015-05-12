var ProductListScraper = require('./productListScraper');
var scrapeMetaData = require('./scrapeMetaData');
var PagePool = require('./pagePool');
var merge = require('merge');
var Q = require('q');

var s = new ProductListScraper(require('webpage').create());
var products = [];
var withMetadata = [];

var dumpAndExit = function () {
  require('fs').write('../out/products-incomplete.json', JSON.stringify(products), 'w');
  phantom.exit();
};

var scrapeIndividualProduct = function (page) {
  return function (p) {
    var onSuccess = function (metadata) {
      console.log('Success: ' + p.title);

      return merge(p, metadata);
    };

    var onError = function (e) {
      console.log('Error: ' + p.title);
      return p;
    };

    return scrapeMetaData(p.link, page).then(onSuccess, onError);
  };
};

var onProductListScrapeEnd = function () {
  require('fs').write('out/products-no-metadata.json', JSON.stringify(products), 'w');
  	
  // create a 10-page pool
  var pagePool = new PagePool(10);
  
  // ...and fire on all cylinders! 
  Q.all(products.map(scrapeIndividualProduct(pagePool))).then(function (ps) {
    pagePool.destroy();
    require('fs').write('out/products-metadata.json', JSON.stringify(ps), 'w');
    phantom.exit();
  });
};

s.on('error', dumpAndExit);

// when the product list scrape is complete, write out the products
// without metadata and then scrape the metadata.
s.on('end', onProductListScrapeEnd);

s.on('product', function (p) {
  products.push(p);
});

s.on('newPage', function (p) {
  console.log('New Page: ' + p);
});

//s.scrape();
products = require('../out/products-no-metadata.json');
onProductListScrapeEnd();