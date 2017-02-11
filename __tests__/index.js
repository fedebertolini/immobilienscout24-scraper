const index = require('../src');

it('exports the list of available cities', () => {
    const cities = index.cities;

    expect(Array.isArray(cities)).toBe(true);
    expect(cities.length).toBeGreaterThan(0);
});

it('scraps the first page of the Berlin apartment list and its apartments', () => {
    const promise = index.scrapCity('Berlin');
    expect(promise instanceof Promise).toBe(true);

    return promise.then((result) => {
        expect(Array.isArray(result.items)).toBe(true);
        expect(result.items.length).toBe(12);
    });
});

it('scraps the second page of the Berlin apartment list and its apartments', () => {
    const promise = index.scrapCity('Berlin', 2);
    expect(promise instanceof Promise).toBe(true);

    return promise.then((result) => {
        expect(Array.isArray(result.items)).toBe(true);
        expect(result.items.length).toBe(12);
    });
});
