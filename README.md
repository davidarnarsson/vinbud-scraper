# Vinbud scraper

Scrapes the icelandic state-owned liquor store for product information. 

Requires PhantomJS to run.

It outputs two JSON files, `products-no-metadata.json` and `products-metadata.json`. The former is the result of scraping the product list, and the latter is the result of scraping each individual product page. 

Needless to say, the latter is more detailed, and takes approximately 1 hour to complete.

To run it, you need phantomjs on your path.

```
npm install
phantomjs src/main.js
```

### Things that can be improved: 

 * Even though the "architecture" supports streaming product results directly to a file, the entire product array is stored in-memory, which is unnecessary. Should be an easy fix.
 * The product metadata scraping could possibly be sped up alot with a little parallelization. That probably means master/slave processes or batching HTTP calls, and I'm too lazy for that :)
 


