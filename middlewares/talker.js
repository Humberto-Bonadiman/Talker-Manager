const fs = require('fs');

const talker = (_request, response) => {
  const talk = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

  if (!talk.length) {
    return response.status(200).json([]);
  }

  return response.status(200).json(talk);
};

module.exports = talker;
