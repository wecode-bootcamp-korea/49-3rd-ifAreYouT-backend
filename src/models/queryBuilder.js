const orderBy = async (sort) => {
  switch (sort) {
    case 'upcoming':
      return `ORDER BY startDate ASC`;
    case 'likes':
      return `ORDER BY likes DESC`;
    case 'sold':
      return `ORDER BY reserved DESC`;
    default:
      return `ORDER BY id ASC`;
  }
};

const page = async (offset, size) => {
  if (offset == null || offset == undefined) return '';
  return `LIMIT ${size} OFFSET ${offset}`;
};

const category = async (category) => {
  if (categoryId == 0) return '';
  return `WHERE categories.category_name = ${categoryId}`;
};

module.exports = { orderBy, page, category };
