var fs = require('fs');
var system = require('system');
var minimist = require('minimist');
var merge = require('merge');
var Q = require('q');
var ProductListScraper = require('./productListScraper');
var scrapeMetaData = require('./scrapeMetaData');
var PagePool = require('./pagePool');
var logger = require('./log')();
var debug = require('./log')('debug');
var products = [];
var args = minimist(system.args);

if (args.level) {
  logger.log('Log level set to "' + args.level + '"');
  require('./log').setLevel(args.level);
}

var exit = function () {
  logger.log('Exiting!');
  phantom.exit();
};

var writeProducts = function(fileName, ps) {
  ps = ps || products;
  logger.log('Dumping data to a file!');
  fs.write(fileName, JSON.stringify(products), 'w');
};

var dumpAndExit = function(e) {
  logger.error(e);
  writeProducts('out/products-incomplete.json');
  exit();
};

/**
 * Executes the metadata scrape for an individual product
 */
var scrapeIndividualProduct = function(page) {
  return function(p) {
    var onSuccess = function(metadata) {
      logger.log('Success: ' + p.title);
      
      return merge(p, metadata);
    };

    var onError = function(e) {
      logger.log('Error: ' + p.title);
      return p;
    };

    return scrapeMetaData(p.link, page, args).then(onSuccess, onError);
  };
};

/**
 * Executed when the no-metadata scrape is done and the --with-metadata parameter is supplied
 */
var doScrapeMetadata = function() {
  writeProducts('out/products-no-metadata.json');
  
  // create a 10-page pool
  var pagePool = new PagePool(10);

  // ...and fire on all cylinders!
  Q.all(products.map(scrapeIndividualProduct(pagePool))).then(function(ps) {
    pagePool.destroy();
    writeProducts('out/products-metadata.json', ps);  
    exit();
  });
};

/**
 * Executed when the no-metadata scrape is done
 */
var onNoMetadataScrapeDone = function() {
  writeProducts('out/products-no-metadata.json');
  exit();
};

var onNewPage = function(pageNumber) {
  logger.log('New Page: ' + pageNumber);
};

var onProduct = function(product) {
  products.push(product);
};

logger.log('Scraping ' + (args['with-metadata'] ? 'with' : 'without') + ' metadata!');
if (args['include-type']) {
  logger.log('\tincluding type information in stock data');
}

var scraper = new ProductListScraper(require('webpage').create());
scraper.on('error', dumpAndExit);
scraper.on('product', onProduct);
scraper.on('newPage', onNewPage);
scraper.on('end', args['with-metadata'] ? doScrapeMetadata : onNoMetadataScrapeDone);

scraper.scrape();