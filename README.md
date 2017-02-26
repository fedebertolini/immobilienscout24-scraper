# immobilienscout24-scraper
Web scraper for the [Immobilien Scout 24 apartment listing](https://www.immobilienscout24.de/).

## Installation
```
npm install immobilienscout24-scraper --save
```

## Usage

```
const scraper = require('immobilienscout24-scraper');
```

#### Cities
You can get the available cities:
```
scraper.cities
```

Output:
```
[
    'Berlin',
    'Bonn',
    'Bremen',
    'Chemnitz',
    'Dortmund',
    'Dresden',
    'Duisburg',
    'Düsseldorf',
    'Essen',
    'Frankfurt',
    'Gelsenkirchen',
    'Hamburg',
    'Hannover',
    'Köln',
    'Leipzig',
    'München',
    'Mönchengladbach',
    'Nürnberg',
    'Stuttgart',
    'Wuppertal'
]
```

#### Scrap city
You can get all listed apartments for a specific city and a specific page (defaults to 1):
```
scraper.scrapCity('Berlin', 1)
```
This will return a `Promise` that resolves in an object with two properties: an array of apartments
and an object with the pagination info.

Output:
```
{
  items:[{
    id:'93219445',
    rentBase:1712,
    rentTotal:2134,
    area:132,
    rooms:4,
    availableFrom:null,
    isAvailable:true,
    address:'Saargemünder Straße 25',
    postalCode:'14195',
    city:'Berlin',
    url:'https://www.immobilienscout24.de/expose/93219445'
  }, {
    id:'92650974',
    rentBase:2499,
    rentTotal:2769,
    area:161,
    rooms:4,
    availableFrom:2017-01-01T00:00:00.000Z,
    isAvailable:true,
    address:'Kurfürstendamm 131',
    postalCode:'10711',
    city:'Berlin',
    url:'https://www.immobilienscout24.de/expose/92650974'
  }, {
    id:'91212520',
    rentBase:1449,
    rentTotal:1776.25,
    area:130.9,
    rooms:5,
    availableFrom:2017-01-15T00:00:00.000Z,
    isAvailable:true,
    address:'Hauffstraße 1A',
    postalCode:'10317',
    city:'Berlin',
    url:'https://www.immobilienscout24.de/expose/91212520'
  }],
  pagination:{
    page:1,
    totalPages:352
  }
}
```
