const cheerio = require('cheerio');

const scrapApartment = ($apartmentNode) => {
    const apartment = {};

    const titleNode = $apartmentNode.find('.resultlist-title');
    apartment.title = titleNode.text();
    apartment.url = titleNode.attr('href').replace('//', 'https://');

    return apartment;
};

const scrapPagination = ($paginationNode) => {
    const pagination = {};

    const currentPage = $paginationNode.find('.pager-numbers-active').text();
    pagination.page = parseInt(currentPage, 10);

    const lastPage = $paginationNode.children().last().text();
    pagination.totalPages = parseInt(lastPage, 10);

    return pagination;
};

exports.scrap = (page) => {
    const $ = cheerio.load(page, {
        decodeEntities: false,
        normalizeWhitespace: true,
    });

    const apartmentNodes = $('.resultlist-container-big, .resultlist-container');
    const apartments = apartmentNodes.map((i, apartment) => scrapApartment($(apartment))).get();

    const pagination = scrapPagination($('#is24-qa-pager-numbers'));

    return {
        items: apartments,
        pagination,
    };
};
