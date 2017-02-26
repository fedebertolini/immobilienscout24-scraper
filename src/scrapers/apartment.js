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
    } else if (splittedAddressBlock.length === 1) {
        const addressRegex = /(\d{5}) (\S+)/.exec(splittedAddressBlock[0]);

        result.postalCode = addressRegex ? addressRegex[1] : null;
        result.city = addressRegex ? addressRegex[2] : null;
    }

    return result;
};

const parseAvailableFrom = (text) => {
    if (text) {
        const dateRegex = /^\D+(\d{1,2}\.\d{1,2}\.\d{4})\s*$/.exec(text);
        if (dateRegex) {
            const dateStr = dateRegex[1].split('.').reverse().join('-');
            const date = new Date(dateStr);
            return {
                availableFrom: date,
                isAvailable: date.getTime() < (new Date()).getTime(),
            };
        } else if (text.trim() === 'sofort') {
            return {
                availableFrom: null,
                isAvailable: true,
            };
        }
    }
    return {
        availableFrom: null,
        isAvailable: false,
    };
};

exports.scrap = (page) => {
    const $ = cheerio.load(page, {
        decodeEntities: false,
        normalizeWhitespace: true,
    });

    let apartment = {};

    apartment.id = $('[name="exposeId"]').val();
    apartment.rentBase = parsePrice($('.is24qa-kaltmiete').text());
    apartment.rentTotal = parsePrice($('.is24qa-gesamtmiete').text());
    apartment.area = parseArea($('.is24qa-wohnflaeche-ca').text().replace(',', '.'));
    apartment.rooms = parseInt($('.is24qa-zi').text(), 10);

    const availability = parseAvailableFrom($('.is24qa-bezugsfrei-ab').text());
    apartment = Object.assign(apartment, availability);

    const addressBlock = $('h4 .address-block [data-ng-non-bindable]');
    if (addressBlock && addressBlock.text().trim()) {
        const addressInfo = scrapAddress(addressBlock.text().trim());
        apartment = Object.assign(apartment, addressInfo);
    }

    return apartment;
};
