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
    "abv": "14",
    "availability": [
        {
            "region": "HÖFUÐBORGARSVÆÐIÐ",
            "stores": [
                {
                    "numberInStock": 24,
                    "store": "Kringlunni"
                },
                {
                    "numberInStock": 11,
                    "store": "Skútuvogi"
                },
                {
                    "numberInStock": 11,
                    "store": "Dalvegi"
                },
                {
                    "numberInStock": 10,
                    "store": "Hafnarfirði"
                }
            ]
        }
    ],
    "category": "Rauðvín",
    "country": "Spánn",
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
    "stockLastUpdated": "18.5.2015 18:49",
    "title": "1Pulso ",
    "weight": "750 ml",
    "wholeseller": "Ber ehf",
    "year": "2010"
}


```

#### Without metadata

```json
{
    "abv": "14%",
    "description": "Kirsuberjarautt. Meðalfylling, ósætt, fersk sýra, miðlungstannín. Rauð ber, skógarbotn, laufkrydd, sveit.",
    "goesWith": {
        "alifuglar": false,
        "eftirrettir": false,
        "fiskur": false,
        "graenmeti": false,
        "grill": true,
        "gris": false,
        "lamb": true,
        "lettariVillibrad": true,
        "naut": true,
        "ostur": false,
        "pasta": false,
        "skelfiskur": false,
        "villibrad": false
    },
    "id": "21460",
    "img": "http://www.vinbudin.is/ProductImages/ThumbnailSizeImages/21460.png",
    "link": "http://www.vinbudin.is/DesktopDefault.aspx/tabid-54?productID=21460",
    "price": "1.785 kr.",
    "reserve": false,
    "tilbuidAdDrekka": true,
    "title": "1Pulso ",
    "weight": "750 ml"
}
```
