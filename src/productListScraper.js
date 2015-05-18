var Emitter = require('./emitter');
var scrapeUtils = require('./scrapeUtils');

var ProductListScraper = function(page) {
  Emitter.call(this);
  this.page = page;
  this.ROOT_URL = "http://www.vinbudin.is/DesktopDefault.aspx/tabid-64?AdvSearch=1&AvailableInStores=True&SpecialOrder=True&searchstring=";
};

ProductListScraper.prototype = Object.create(Emitter.prototype, {});
ProductListScraper.prototype.constructor = ProductListScraper;

/*
 * Finds products on a product search page on vinbudin. Depends on a PhantomJS DOM. 
 */
var findProducts = function() {
  var mapSingleProduct = function(row) {
    var sibling = row.nextSibling;
    var product = {
      img: row.querySelector('.img img').src,
      link: row.querySelector('.title a').href,
      id: row.querySelector('.title span').innerText.substring(1,6),
      title: row.querySelector('.title a').innerText,
      weight: row.querySelector('.weight').innerText,
      abv: row.querySelector('.volume').innerText,
      price: row.querySelector('.price').innerText,
      description: sibling.querySelector('.description').innerText,
      goesWith: {
        beef: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/Naut.gif"]'),
        lamb: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/Lamb.gif"]'),
        grill: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/Grill.gif"]'),
        lightGame: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/LettariVillibrad.gif"]'),
        readyToDrink: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/TilbuidAdDrekka.gif"]'),
        pork: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/Gris.gif"]'),
        fish: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/Fiskur.gif"]'),
        shellfish: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/Skelfiskur.gif"]'),
        cheese: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/Ostur.gif"]'),
        game: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/Villibrad.gif"]'),
        ali: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/Alifuglar.gif"]'),
        pasta: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/Pasta.gif"]'),
        vegetables: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/Graenmetisrettir.gif"]'),
        desserts: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/Eftirrettir.gif"]')
      },
      reserve: !!sibling.querySelector('.food-icon img[src="Addons/Origo/Module/Img/SpecialReserve.gif"]')
    };

    return product;
  };

  return Array.prototype.slice
    .call(document.querySelectorAll('.product-table tr.upper'))
    .map(mapSingleProduct);
};

/** 
  Gets the next page on a vinbud product search page. Depends on a PhantomJS DOM.
 */
var getNextPage = function () {
  var current = document.querySelector('.selectedpage');
  var next = document.querySelector('.paging_button_next');

  if (!next || (next && next.classList && next.classList.contains('aspNetDisabled'))) {
    return null;
  }

  next.click();
  return current.innerText;
};

/**
 * Performs a scrape on a particular product list url, using the given scraper instance
 */
var scrape = function (url, scraper) {
  var page = scraper.page;
  page.onConsoleMessage = function (msg) {
    console.log('Browser: ' + msg);
  };
  
  // because the page uses a sucky async paging mechanism
  // we repeatedly scrape the same page for products
  var scrapeProducts = function () {
    var products = page.evaluate(findProducts);

    console.log('Got: ' + products.length + ' products');

    if (products && products.length) {
      products.map(function (p) {
        scraper.emit('product', p);
      });
    }

    console.log('Getting the next page');

    var next = page.evaluate(getNextPage);

    if (!next) {
      console.log('There is no next page!');
      scraper.emit('end');
      return;
    } else {
      console.log('Waiting for the page to load');
      scrapeUtils.waitForTextChange(page, 'span.selectedpage', function(n) {
        scraper.emit('newPage', n);
        scrapeProducts();
      });
    }
  };

  page.open(url, function(status) {
    if (status !== 'success') {
      return scraper.emit('error', status);
    }

    // select 30 products per page to limit requests
    page.evaluate(function() {
      console.log('Clicking to expand to 30 products per page!');
      document.querySelector('#ctl01_ctl00_LinkButton30ProductsOnPage').click();
    });

    // once the page has reloaded with 30 products
    scrapeUtils.waitFor(page, function() {
      return document.querySelector('#ctl01_ctl00_LinkButton30ProductsOnPage')
               .classList.contains('page-size-active');
    }, function() {
        // we start a-scrapin'!
        console.log('Starting to scrape!');
        scrapeProducts();
      });
  });
};

ProductListScraper.prototype.scrape = function() {
  try {
    scrape(this.ROOT_URL, this);
  } catch (e) {
    this.trigger('error', e);
  }
};

module.exports = ProductListScraper;
