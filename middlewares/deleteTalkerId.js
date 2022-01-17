const fs = require('fs');

const consoleError = (err) => {
  if (err) {
    return console.error(err);
  }
};

const deleteTalkerId = (request, response) => {
  const { id } = request.params;
  const lookJson = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const talkerIndex = lookJson.findIndex((index) => index.id === parseInt(id, 10));
  if (talkerIndex === -1) return response.status(404).json({ message: 'Talker not found!' });
  lookJson.splice(talkerIndex, 1);
  fs.writeFile('./talker.json', JSON.stringify(lookJson), (err) => consoleError(err));
  return response.status(204).end();
};

module.exports = deleteTalkerId;