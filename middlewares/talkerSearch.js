const fs = require('fs');

const talkerSearch = (request, response, next) => {
  const { q } = request.query;
  if (!q) return next();
  const lookJson = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const filterQuery = lookJson.filter((r) => r.name.includes(q));
  if (filterQuery) return response.status(200).json(filterQuery);
  return response.status(200).json([]);
};

module.exports = talkerSearch;