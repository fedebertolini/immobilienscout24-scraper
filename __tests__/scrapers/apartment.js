const fs = require('fs');
const scraper = require('../../src/scrapers/apartment');

it('scraps the apartment1.html', () => {
    const file = fs.readFileSync(`${process.cwd()}/__tests__/scrapers/pages/apartment1.html`);
    const apartment = scraper.scrap(file);

    expect(apartment.rentBase).toBe(669);
    expect(apartment.rentTotal).toBe(789);
    expect(apartment.rentAdditionalCosts).toBe(120);
    expect(apartment.area).toBe(57.62);
    expect(apartment.address).toBe('Czarnikauer Straße 8a');
    expect(apartment.postalCode).toBe('10439');
    expect(apartment.city).toBe('Berlin');
});
