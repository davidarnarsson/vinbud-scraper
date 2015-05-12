# Vinbud scraper

Scrapes the icelandic state-owned liquor store for product information. 

Requires PhantomJS to run.

It outputs two JSON files, `products-no-metadata.json` and `products-metadata.json`. The former is the result of scraping the product list, and the latter is the result of scraping each individual product page. 

Needless to say, the latter is more detailed, and takes approximately 1 hour to complete. Scraping the product list only takes a couple of minutes.

To run it, you need phantomjs on your path.

```
npm install
phantomjs src/main.js
```

### Things that can be improved: 

 * Even though the "architecture" supports streaming product results directly to a file, the entire product array is stored in-memory, which is unnecessary. Should be an easy fix.
 * ~~The product metadata scraping could possibly be sped up alot with a little parallelization. That probably means master/slave processes or batching HTTP calls, and I'm too lazy for that :)~~ Turns out I wasn't too lazy.
 

### Example documents 

#### With metadata

```

{  
  "alifuglar":false,
  "description":"Rúbínrautt. Meðalfylling, ósætt, fersk sýra, miðlungstannín. Dökk ber, sólber, krydd, eik.",
  "eftirrettir":false,
  "fiskur":false,
  "graenmeti":false,
  "grill":true,
  "gris":false,
  "id":"(10913)",
  "img":"http://www.vinbudin.is/ProductImages/ThumbnailSizeImages/10913.png",
  "lamb":true,
  "lettariVillibrad":false,
  "link":"http://www.vinbudin.is/DesktopDefault.aspx/tabid-54?productID=10913",
  "naut":true,
  "ostur":false,
  "pasta":false,
  "price":"1.999 kr.",
  "reserve":false,
  "skelfiskur":false,
  "tilbuidAdDrekka":true,
  "title":"Adobe Cabernet Sauvignon Reserva",
  "villibrad":false,
  "volume":"750 ml",
  "weight":"750 ml",
  "year":"2013",
  "abv":"13,5",
  "category":"Rauðvín",
  "wholeseller":"Haugen-Gruppen ehf.",
  "country":"Chile",
  "stockLastUpdated":"12.5.2015 14:51",
  "availability":[  
    {  
      "region":"HÖFUÐBORGARSVÆÐIÐ",
      "stores":[  
        {  
          "stock":"17",
          "store":"Austurstræti",
          "type":"stykki"
        },
        {  
          "stock":"12",
          "store":"Kringlunni",
          "type":"stykki"
        },
        {  
          "stock":"11",
          "store":"Skeifunni",
          "type":"stykki"
        },
        {  
          "stock":"8",
          "store":"Stekkjarbakka",
          "type":"stykki"
        },
        {  
          "stock":"15",
          "store":"Dalvegi",
          "type":"stykki"
        },
        {  
          "stock":"6",
          "store":"Smáralind",
          "type":"stykki"
        }
      ]
    },
    {  
      "region":"VESTURLAND",
      "stores":[  
        {  
          "stock":"10",
          "store":"Akranesi",
          "type":"stykki"
        },
        {  
          "stock":"8",
          "store":"Borgarnesi",
          "type":"stykki"
        }
      ]
    },
    {  
      "region":"VESTFIRDIR",
      "stores":[  
        {  
          "stock":"14",
          "store":"Ísafirði",
          "type":"stykki"
        }
      ]
    },
    {  
      "region":"NORÐURLAND",
      "stores":[  
        {  
          "stock":"16",
          "store":"Sauðárkróki",
          "type":"stykki"
        },
        {  
          "stock":"15",
          "store":"Akureyri",
          "type":"stykki"
        }
      ]
    },
    {  
      "region":"AUSTURLAND",
      "stores":[  
        {  
          "stock":"9",
          "store":"Egilsstöðum",
          "type":"stykki"
        }
      ]
    },
    {  
      "region":"SUÐURLAND",
      "stores":[  
        {  
          "stock":"9",
          "store":"Reykjanesbæ",
          "type":"stykki"
        },
        {  
          "stock":"9",
          "store":"Selfossi",
          "type":"stykki"
        }
      ]
    }
  ]
}


```

#### Without metadata

```
{  
  "alifuglar":false,
  "description":"Ljósjarðarberjarautt. Léttkolsýrt, hálfsætt, létt fylling, fersk sýra. Jarðarber.",
  "eftirrettir":false,
  "fiskur":false,
  "graenmeti":true,
  "grill":false,
  "gris":false,
  "id":"(21611)",
  "img":"http://www.vinbudin.is/ProductImages/ThumbnailSizeImages/21611.png",
  "lamb":false,
  "lettariVillibrad":false,
  "link":"http://www.vinbudin.is/DesktopDefault.aspx/tabid-54?productID=21611",
  "naut":false,
  "ostur":false,
  "pasta":true,
  "price":"1.499 kr.",
  "reserve":false,
  "skelfiskur":false,
  "tilbuidAdDrekka":true,
  "title":"Black Tower Pink Bubbly ",
  "villibrad":false,
  "volume":"8,5%",
  "weight":"750 ml"
}
```