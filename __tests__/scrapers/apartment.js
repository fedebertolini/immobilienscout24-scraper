const fs = require('fs');
const scraper = require('../../src/scrapers/apartment');

it('scraps the apartment1.html', () => {
    const file = fs.readFileSync(`${process.cwd()}/__tests__/scrapers/pages/apartment1.html`);
    const apartment = scraper.scrap(file);

    expect(apartment.rentBase).toBe(669);
    expect(apartment.rentTotal).toBe(789);
    expect(apartment.area).toBe(57.62);
    expect(apartment.rooms).toBe(2);
    expect(apartment.address).toBe('Czarnikauer Straße 8a');
    expect(apartment.postalCode).toBe('10439');
    expect(apartment.city).toBe('Berlin');
    expect(apartment.availableFrom).toBe(true);
});

it('scraps the apartment2.html', () => {
    const file = fs.readFileSync(`${process.cwd()}/__tests__/scrapers/pages/apartment2.html`);
    const apartment = scraper.scrap(file);

    expect(apartment.rentBase).toBe(826);
    expect(apartment.rentTotal).toBe(930.80);
    expect(apartment.area).toBe(59);
    expect(apartment.rooms).toBe(2);
    expect(apartment.address).toBe('Wilmsstraße 17');
    expect(apartment.postalCode).toBe('10961');
    expect(apartment.city).toBe('Berlin');
    expect(apartment.availableFrom).toEqual(new Date('2017-04-01'));
});
