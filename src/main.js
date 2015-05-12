var ProductListScraper = require('./productListScraper');
var scrapeMetaData = require('./scrapeMetaData');
var merge = require('merge');
var Q = require('q');

var s = new ProductListScraper(require('webpage').create());
var products = [];
var withMetadata = [];

var dumpAndExit = function() {
  require('fs').write('../out/products-incomplete.json', JSON.stringify(products), 'w');
  phantom.exit();
};

var scrapeIndividualProduct = function (page) {
  return function (p) {
    return function() {
      var onSuccess = function (metadata) {
        console.log('Success: ' + p.title);
        
        withMetadata.push(merge(p, metadata));
      };
      
      var onError = function (e) {
        console.log('Error: ' + p.title);
        withMetadata.push(p); 
      };
      
      return scrapeMetaData(p.link, page).then(onSuccess, onError);  
    };  
  };
};

var onProductListScrapeEnd = function() {
  require('fs').write('out/products-no-metadata.json', JSON.stringify(products), 'w');
  
  var page = require('webpage').create();
   
  // turn the products into metadata scrape-producing functions
  var pfuncs = products.map(scrapeIndividualProduct(page));
  
  // and execute sequencially, one product at a time 
  pfuncs.reduce(Q.when, Q([])).then(function() {
    page.close();
    require('fs').write('out/products-metadata.json', JSON.stringify(withMetadata), 'w');
    phantom.exit();
  });
};

s.on('error', dumpAndExit);

// when the product list scrape is complete, write out the products
// without metadata and then scrape the metadata.
s.on('end', onProductListScrapeEnd);

s.on('product', function(p) {
  products.push(p);
});

s.on('newPage', function (p) {
  console.log('New Page: ' + p);
});

s.scrape();
