/* eslint-disable no-unused-vars */
export default function paginate(totalItems, page = 1, pageSize = 10, maxPages = 10) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (page < 1) {
    page = 1;
  } else if (page > totalPages) {
    page = totalPages;
  }

  let startPage, endPage;

  if (totalPages <= maxPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforepage = Math.floor(maxPages / 2);
    let maxPagesAfterpage = Math.ceil(maxPages / 2) - 1;
    if (page <= maxPagesBeforepage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (page + maxPagesAfterpage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = page - maxPagesBeforepage;
      endPage = page + maxPagesAfterpage;
    }
  }

  // calculate start and end item indexes
  let startIndex = (page - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

  return {
    totalItems,
    totalPages,
    page,
    previousPage: page - 1,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    hasNextPage: page < totalPages,
    pages
  }
}
