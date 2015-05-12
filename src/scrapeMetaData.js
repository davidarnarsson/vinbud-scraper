var scrapeUtils = require('./scrapeUtils');
var Q = require('q');

/**
 * oh god this state machine-y yuckiness. This depends on the PhantomJS DOM so 
 * all functions must be defined within the function which gets eval'd.
 */
var scrapeStockTables = function () {
  var scrapeStoreStock = function (node) {
    var data = {};
    data.store = node.innerText;
   
    node = node.nextSibling;
    data.stock = node.innerText;
    
    node = node.nextSibling;
    data.type = node.innerText;
    return data;
  };
  
  var scrapeStockTable = function (stockTable) {
    return {
      region: stockTable.querySelector('th').innerText,
      stores: Array.prototype.slice
                .call(stockTable.querySelectorAll('td.oddRow.store'))
                .map(scrapeStoreStock)
    };
  };
  
  return Array.prototype.slice
          .call(document.querySelectorAll('table.tableStockStatus'))
          .map(scrapeStockTable);
};
  


var scrapeMetaData = function (url, page) {
  var deferred = Q.defer();
  
  page.open(url, function(status) {
    if (status !== 'success') {
      return deferred.reject();
    }
    
    var metadata = {};
    
    // knowing .NET, these IDs might break rather easily.
    metadata.year = scrapeUtils.getString(page, "#ctl01_ctl00_Label_ProductYear");
    metadata.abv = scrapeUtils.getString(page,'#ctl01_ctl00_Label_ProductAlchoholVolume');
    metadata.volume = scrapeUtils.getString(page, '#ctl01_ctl00_Label_ProductBottledVolume');
    metadata.category = scrapeUtils.getString(page, "#ctl01_ctl00_Label_ProductSubCategory");
    metadata.wholeseller = scrapeUtils.getString(page, "#ctl01_ctl00_Label_ProductSeller");
    metadata.country = scrapeUtils.getString(page, "#ctl01_ctl00_Label_ProductCountryOfOrigin");
    metadata.reserve = scrapeUtils.exists(page, "#ctl01_ctl00_Image_SpecialReserve");
    metadata.description = scrapeUtils.getString(page, '#ctl01_ctl00_Label_ProductDescription');
    metadata.stockLastUpdated = scrapeUtils.getString(page, '#ctl01_ctl00_span_stockStatusLastUpdated strong')
      .replace('[', '')
      .replace(']', '');

    metadata.availability = page.evaluate(scrapeStockTables);
    
    deferred.resolve(metadata);
  });
  
  return deferred.promise;
};

module.exports = scrapeMetaData;