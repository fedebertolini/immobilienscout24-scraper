const cheerio = require('cheerio');

const parseArea = (text) => {
    const areaRegex = /(\d*.\d*) m²/.exec(text);
    return areaRegex ? parseFloat(areaRegex[1].replace(',', '.')) : null;
};

const parsePrice = (text) => {
    const sanitizedText = text.replace('.', '').replace(',', '.');
    const priceRegex = /(\d+\D?\d*)\s*€/.exec(sanitizedText);
    return priceRegex ? parseFloat(priceRegex[1]) : null;
};

const scrapAddress = (addressBlock) => {
    const result = {};

    const splittedAddressBlock = addressBlock.split(',');
    if (splittedAddressBlock.length === 3) {
        const addressRegex = /(\d{5}) (\S+)/.exec(splittedAddressBlock[1]);

        result.address = splittedAddressBlock[0];
        result.postalCode = addressRegex ? addressRegex[1] : null;
        result.city = addressRegex ? addressRegex[2] : null;
    }

    return result;
};

exports.scrap = (page) => {
    const $ = cheerio.load(page, {
        decodeEntities: false,
        normalizeWhitespace: true,
    });

    let apartment = {};

    apartment.rentBase = parsePrice($('.is24qa-kaltmiete').text());
    apartment.rentTotal = parsePrice($('.is24qa-gesamtmiete').text());
    apartment.rentAdditionalCosts = parsePrice($('.is24qa-nebenkosten').text());
    apartment.area = parseArea($('.is24qa-wohnflaeche-ca').text().replace(',', '.'));
    apartment.rooms = parseInt($('.is24qa-zi').text(), 10);

    const addressBlock = $('h4 .address-block [data-ng-non-bindable]');
    if (addressBlock && addressBlock.text().trim()) {
        const addressInfo = scrapAddress(addressBlock.text().trim());
        apartment = Object.assign(apartment, addressInfo);
    }

    return apartment;
};
