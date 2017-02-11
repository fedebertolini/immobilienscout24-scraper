const request = require('request');
const listScraper = require('./scrapers/list');
const apartmentScraper = require('./scrapers/apartment');
const cityPaths = require('./cityPaths.json');

const host = 'https://www.immobilienscout24.de';

const getListUrl = (city, page) => {
    const cityPath = cityPaths[city.toLowerCase()];
    if (!cityPath) {
        throw new Error(`Invalid city: ${city}`);
    }
    if (page === 1) {
        return `${host}/wohnen/${cityPath}/mietwohnungen.html`;
    }
    return `${host}/wohnen/${cityPath}/mietwohnungen,seite-${page}.html`;
};

const scrapCity = (city, page = 1) => new Promise((resolve, reject) => {
    let url;
    try {
        url = getListUrl(city, page);
    } catch(e) {
        reject(e);
        return;
    }

    request(url, (error, response, body) => {
        if (error) {
            reject(error);
        }
        if (response.statusCode !== 200) {
            reject(`Invalid response: ${response.statusCode}`);
        }
        const apartments = listScraper.scrap(body);
        resolve(apartments);
    });
});

exports.cities = Object.keys(cityPaths);
exports.scrapCity = scrapCity;
