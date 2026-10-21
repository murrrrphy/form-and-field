export const ALL_CATEGORIES = 'All essentials';
export const PRICE_FILTER_LIMIT = 50;

const sortComparators = {
  low: (first, second) => first.price - second.price,
  high: (first, second) => second.price - first.price,
  rating: (first, second) => second.rating - first.rating,
  new: (first, second) => Number(second.tag === 'NEW') - Number(first.tag === 'NEW'),
};

export function filterProducts(
  products,
  { category, query, sortOrder, underPriceLimit, showSavedOnly, savedIds },
) {
  const searchTerm = query.toLowerCase();
  const matches = products.filter((product) => {
    const matchesCategory = category === ALL_CATEGORIES || product.category === category;
    const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(searchTerm);
    const matchesPrice = !underPriceLimit || product.price < PRICE_FILTER_LIMIT;
    const matchesSaved = !showSavedOnly || savedIds.includes(product.id);
    return matchesCategory && matchesSearch && matchesPrice && matchesSaved;
  });

  const compare = sortComparators[sortOrder];
  return compare ? matches.sort(compare) : matches;
}
