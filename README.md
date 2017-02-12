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
  items:[
    {
      rentBase:1119,
      rentTotal:1396.05,
      area:110.75,
      rooms:3,
      address:'Jugendweg 11',
      postalCode:'13629',
      city:'Berlin',
      url:'https://www.immobilienscout24.de/expose/92780458'
    },
    {
      rentBase:1690,
      rentTotal:1690,
      area:34,
      rooms:2,
      address:'Otto-Braun Strasse 67',
      postalCode:'10178',
      city:'Berlin',
      url:'https://www.immobilienscout24.de/expose/79469862'
    },
    {
      rentBase:906,
      rentTotal:1103.4,
      area:56.79,
      rooms:2,
      address:'Hallesche Straße 8',
      postalCode:'10963',
      city:'Berlin',
      url:'https://www.immobilienscout24.de/expose/91655737'
    }
  ],
  pagination:{
    page:1,
    totalPages:352
  }
}
```
