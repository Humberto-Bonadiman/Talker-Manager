const fs = require('fs');

const talker = (_request, response) => {
  const talk = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

  if (!talk.length) {
    response.status(200).json([]);
  }

  response.status(200).json(talk);
};

module.exports = talker;
