const fs = require('fs');
const scraper = require('../../src/scrapers/apartment');

it('scraps the apartment1.html', () => {
    const file = fs.readFileSync(`${process.cwd()}/__tests__/scrapers/pages/apartment1.html`);
    const apartment = scraper.scrap(file);

    expect(apartment.id).toBe('90961525');
    expect(apartment.rentBase).toBe(669);
    expect(apartment.rentTotal).toBe(789);
    expect(apartment.area).toBe(57.62);
    expect(apartment.rooms).toBe(2);
    expect(apartment.address).toBe('Czarnikauer Straße 8a');
    expect(apartment.postalCode).toBe('10439');
    expect(apartment.city).toBe('Berlin');
    expect(apartment.availableFrom).toBeNull();
    expect(apartment.isAvailable).toBe(true);
    expect(apartment.images).toEqual([
        'https://pictureis24-a.akamaihd.net/pic/orig04/N/557/756/903/557756903-0.jpg/ORIG/resize/1106x830%3E/format/jpg/quality/80',
        'https://pictureis24-a.akamaihd.net/pic/orig03/N/557/756/910/557756910-0.jpg/ORIG/resize/1106x830%3E/format/jpg/quality/80',
        'https://pictureis24-a.akamaihd.net/pic/orig03/N/557/756/814/557756814-0.jpg/ORIG/resize/1106x830%3E/format/jpg/quality/80',
        'https://pictureis24-a.akamaihd.net/pic/orig02/N/557/756/833/557756833-0.jpg/ORIG/resize/1106x830%3E/format/jpg/quality/80',
        'https://pictureis24-a.akamaihd.net/pic/orig02/N/557/756/873/557756873-0.jpg/ORIG/resize/1106x830%3E/format/jpg/quality/80',
        'https://pictureis24-a.akamaihd.net/pic/orig03/N/531/272/498/531272498-0.jpg/ORIG/resize/1106x830%3E/format/jpg/quality/80',
    ]);
});

it('scraps the apartment2.html', () => {
    const file = fs.readFileSync(`${process.cwd()}/__tests__/scrapers/pages/apartment2.html`);
    const apartment = scraper.scrap(file);

    expect(apartment.id).toBe('93206243');
    expect(apartment.rentBase).toBe(826);
    expect(apartment.rentTotal).toBe(930.80);
    expect(apartment.area).toBe(59);
    expect(apartment.rooms).toBe(2);
    expect(apartment.address).toBe('Wilmsstraße 17');
    expect(apartment.postalCode).toBe('10961');
    expect(apartment.city).toBe('Berlin');
    expect(apartment.availableFrom).toEqual(new Date('2017-04-01'));
    expect(apartment.isAvailable).toBe(false);
    expect(apartment.images).toEqual([]);
});
