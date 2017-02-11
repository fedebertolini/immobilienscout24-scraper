const fs = require('fs');
const scraper = require('../../src/scrapers/list');

it('scraps the first page of the Berlin apartment\'s list', () => {
    const file = fs.readFileSync(`${process.cwd()}/__tests__/scrapers/pages/listFirstPage.html`);
    const { items, pagination } = scraper.scrap(file);

    expect(items.length).toBe(12);

    expect(pagination.page).toBe(1);
    expect(pagination.totalPages).toBe(353);
});

it('scraps the fifth page of the Berlin apartment\'s list', () => {
    const file = fs.readFileSync(`${process.cwd()}/__tests__/scrapers/pages/listFifthPage.html`);
    const { items, pagination } = scraper.scrap(file);

    expect(items.length).toBe(12);

    expect(pagination.page).toBe(5);
    expect(pagination.totalPages).toBe(352);
});
