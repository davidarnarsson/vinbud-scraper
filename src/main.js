var ProductListScraper = require('./productListScraper');
var scrapeMetaData = require('./scrapeMetaData');
var merge = require('merge');
var Q = require('q');

var s = new ProductListScraper(require('webpage').create());
var products = [];

var dumpAndExit = function() {
  require('fs').write('../out/products-incomplete.json', JSON.stringify(products), 'w');
  phantom.exit();
};

var scrapeIndividualProduct = function (i, page) {
  var product = products[i];
  var onSuccess = function (metadata) {
    console.log('Success: ' + product.title);
    products[i] = merge(product, metadata);
    return scrapeIndividualProduct((i+1), page);
  };
  
  var onError = function (e) {
    console.log('Error: ' + product.title);
    return scrapeIndividualProduct((i+1), page);
  };
  
  return scrapeMetaData(product.link, page).then(onSuccess, onError);
};

var onProductListScrapeEnd = function() {
  require('fs').write('../out/products-no-metadata.json', JSON.stringify(products), 'w');
  
  var page = require('webpage').create();
  scrapeIndividualProduct(0, page).then(function() {
    page.close();
    require('fs').write('../out/products-metadata.json', JSON.stringify(products), 'w');
    phantom.exit();
  });;
  
    
  
};

s.on('error', dumpAndExit);
s.on('end', onProductListScrapeEnd);

s.on('product', function(p) {
  products.push(p);
});

s.on('newPage', function (p) {
  console.log('New Page: ' + p);
});

//s.scrape();
products = require('../out/products-no-metadata.json');
onProductListScrapeEnd();
