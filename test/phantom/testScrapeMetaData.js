
var scrapeMetadata = require('../../src/scrapeMetaData');
var PagePool = require('../../src/pagePool');

module.exports = function (test) {
  var pagePool = new PagePool(1);
  
  test('should fetch the correct availability figures (issue #6)', function (result) {
      scrapeMetadata('fixtures/scrapeMetadata-availability.html', pagePool, {}).then(function (metadata) {
        if (!metadata) return result(false);
        
        if (metadata.availability.length !== 6) return result(false);
        
        var stores = metadata.availability.reduce(function(prev, current) {
          return prev.concat(current.stores)
        },[]);
        
        if (stores.length !== 49) return result(false);
        
        result(true);
      });
  });  
};

