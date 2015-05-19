# Vinbud scraper

Scrapes the icelandic state-owned liquor store for product information. 

Requires PhantomJS 2.0 to run. Previous versions will not work.

It outputs two JSON files, `products-no-metadata.json` and `products-metadata.json`. The former is the result of scraping the product list, and the latter is the result of scraping each individual product page. 

Needless to say, the latter is more detailed, and takes approximately 1 hour to complete. Scraping the product list only takes a couple of minutes.

To run it, you need phantomjs on your path.

```
npm install
phantomjs src/main.js
```
To get the full metadata scrape, you need to run it with the optional `--with-metadata` parameter.  
### Example documents 

#### With metadata

```json

{  
  "description":"Rúbínrautt. Meðalfylling, ósætt, fersk sýra, miðlungstannín. Dökk ber, sólber, krydd, eik.",
  "id":"(10913)",
  "img":"http://www.vinbudin.is/ProductImages/ThumbnailSizeImages/10913.png",
  "link":"http://www.vinbudin.is/DesktopDefault.aspx/tabid-54?productID=10913", 
  "price":"1.999 kr.",  
  "title":"Adobe Cabernet Sauvignon Reserva",
  "goesWith": {
    "ali":false,
    "beef":true,
    "cheese":false,
    "desserts":false,
    "fish":false,
    "game":false,
    "grill":true,
    "lamb":true,
    "lightGame":true,
    "pasta":false,
    "pork":false,
    "readyToDrink":true,
    "shellfish":false,
    "vegetables":false
  },
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

```json
{
  "abv":"14%",
  "description":"Kirsuberjarautt. Meðalfylling, ósætt, fersk sýra, miðlungstannín. Rauð ber, skógarbotn, laufkrydd, sveit.",
  "goesWith": {
    "ali":false,
    "beef":true,
    "cheese":false,
    "desserts":false,
    "fish":false,
    "game":false,
    "grill":true,
    "lamb":true,
    "lightGame":true,
    "pasta":false,
    "pork":false,
    "readyToDrink":true,
    "shellfish":false,
    "vegetables":false
  },
  "id":"(21460)",
  "img":"http://www.vinbudin.is/ProductImages/ThumbnailSizeImages/21460.png",
  "link":"http://www.vinbudin.is/DesktopDefault.aspx/tabid-54?productID=21460",
  "price":"1.785 kr.",
  "reserve":false,
  "title":"1Pulso ",
  "weight":"750 ml"
}
```
