var fs = require('fs');
var system = require('system');
var merge = require('merge');
var Q = require('q');

var ProductListScraper = require('./productListScraper');
var scrapeMetaData = require('./scrapeMetaData');
var PagePool = require('./pagePool');
var s = new ProductListScraper(require('webpage').create());

var products = [];
var withMetadata = [];

var dumpAndExit = function() {
  console('Dumping data to a file!');
  fs.write('../out/products-incomplete.json', JSON.stringify(products), 'w');
  console.log('Exiting!');
  phantom.exit();
};

var scrapeIndividualProduct = function(page) {
  return function(p) {
    var onSuccess = function(metadata) {
      console.log('Success: ' + p.title);

      return merge(p, metadata);
    };

    var onError = function(e) {
      console.log('Error: ' + p.title);
      return p;
    };

    return scrapeMetaData(p.link, page).then(onSuccess, onError);
  };
};

var onProductListScrapeEnd = function() {
  fs.write('out/products-no-metadata.json', JSON.stringify(products), 'w');

  // create a 10-page pool
  var pagePool = new PagePool(10);

  // ...and fire on all cylinders!
  Q.all(products.map(scrapeIndividualProduct(pagePool))).then(function(ps) {
    pagePool.destroy();
    require('fs').write('out/products-metadata.json', JSON.stringify(ps), 'w');
    fs.write('out/products-metadata.json', JSON.stringify(ps), 'w');

    phantom.exit();
  });
};

s.on('error', dumpAndExit);

s.on('product', function(product) {
  products.push(product);
});

s.on('newPage', function(pageNumber) {
  console.log('New Page: ' + pageNumber);
});

if (system.args.indexOf('--with-metadata') !== -1) {
  console.log('Scraping with metadata!');
  // when the product list scrape is complete, write out the products
  // without metadata and then scrape the metadata.
  s.on('end', onProductListScrapeEnd);
} else {
  s.on('end', function() {
    console.log('Dumping data to json file!');
    fs.write('out/products-no-metadata.json', JSON.stringify(products), 'w');
    console.log('Exiting!');
    phantom.exit();
  });
}

s.scrape();
