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

### Tests

Tests are executed using mocha. To execute the tests, run `npm test`.

### Example documents 

#### With metadata

```json

{
    "abv": "13,5",
    "availability": [
        {
            "region": "HÖFUÐBORGARSVÆÐIÐ",
            "stores": [
                {
                    "numberInStock": 14,
                    "store": "Austurstræti"
                },
                {
                    "numberInStock": 33,
                    "store": "Kringlunni"
                },
                {
                    "numberInStock": 24,
                    "store": "Skeifunni"
                },
                {
                    "numberInStock": 17,
                    "store": "Stekkjarbakka"
                },
                {
                    "numberInStock": 34,
                    "store": "Dalvegi"
                },
                {
                    "numberInStock": 14,
                    "store": "Smáralind"
                }
            ]
        },
        {
            "region": "VESTURLAND",
            "stores": [
                {
                    "numberInStock": 9,
                    "store": "Akranesi"
                }
            ]
        },
        {
            "region": "VESTFIRDIR",
            "stores": [
                {
                    "numberInStock": 10,
                    "store": "Ísafirði"
                }
            ]
        },
        {
            "region": "NORÐURLAND",
            "stores": [
                {
                    "numberInStock": 13,
                    "store": "Sauðárkróki"
                },
                {
                    "numberInStock": 12,
                    "store": "Akureyri"
                }
            ]
        },
        {
            "region": "AUSTURLAND",
            "stores": [
                {
                    "numberInStock": 4,
                    "store": "Egilsstöðum"
                }
            ]
        },
        {
            "region": "SUÐURLAND",
            "stores": [
                {
                    "numberInStock": 8,
                    "store": "Reykjanesbæ"
                },
                {
                    "numberInStock": 17,
                    "store": "Selfossi"
                }
            ]
        }
    ],
    "category": "Rauðvín",
    "country": "Chile",
    "description": "Rúbínrautt. Meðalfylling, ósætt, fersk sýra, miðlungstannín. Dökk ber, sólber, krydd, eik.",
    "goesWith": {
        "ali": false,
        "beef": true,
        "cheese": false,
        "desserts": false,
        "fish": false,
        "game": false,
        "grill": true,
        "lamb": true,
        "lightGame": false,
        "pasta": false,
        "pork": false,
        "readyToDrink": true,
        "shellfish": false,
        "vegetables": false
    },
    "id": "10913",
    "img": "http://www.vinbudin.is/ProductImages/ThumbnailSizeImages/10913.png",
    "link": "http://www.vinbudin.is/DesktopDefault.aspx/tabid-54?productID=10913",
    "price": "1.999 kr.",
    "reserve": false,
    "stockLastUpdated": "18.5.2015 18:49",
    "title": "Adobe Cabernet Sauvignon Reserva",
    "weight": "750 ml",
    "wholeseller": "Haugen-Gruppen ehf.",
    "year": "2013"
}


```

#### Without metadata

```json
{
    "abv": "14%",
    "description": "Kirsuberjarautt. Meðalfylling, ósætt, fersk sýra, miðlungstannín. Rauð ber, skógarbotn, laufkrydd, sveit.",
    "goesWith": {
        "ali": false,
        "beef": true,
        "cheese": false,
        "desserts": false,
        "fish": false,
        "game": false,
        "grill": true,
        "lamb": true,
        "lightGame": true,
        "pasta": false,
        "pork": false,
        "readyToDrink": true,
        "shellfish": false,
        "vegetables": false
    },
    "id": "21460",
    "img": "http://www.vinbudin.is/ProductImages/ThumbnailSizeImages/21460.png",
    "link": "http://www.vinbudin.is/DesktopDefault.aspx/tabid-54?productID=21460",
    "price": "1.785 kr.",
    "reserve": false,
    "title": "1Pulso ",
    "weight": "750 ml"
}
```
