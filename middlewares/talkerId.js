const fs = require('fs');

const talkerId = (request, response) => {
  const { id } = request.params;
  const talkId = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const checkId = talkId.find((r) => r.id === parseInt(id, 10));

  if (!checkId) return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  response.status(200).json(checkId);
};

module.exports = talkerId;
