const fs = require('fs');

function DataValidator(data) {
  const RegExpData = /^([0-3][0-1]|[0-2]\d)\/(0[1-9]|1[0-2])\/\d{4}/;
  return RegExpData.test(data);
}

/* Source DataValidator:
  https://trybecourse.slack.com/archives/C023YHXAEGM/p1642220305084600 */

const consoleErro = (err) => {
  if (err) {
    return console.error(err);
  }
};

function postTalkerId(newPerson, id) {
  const lookJson = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const newId = Number(id);
  const addNewPerson = { id: newId, ...newPerson };
  lookJson.splice(newId, 1, addNewPerson);
  fs.writeFile('./talker.json', JSON.stringify(lookJson), (err) => consoleErro(err));
  return addNewPerson;
}

const validateAge = (request, response, next) => {
  const { age } = request.body;
  if (age === undefined) {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validationId = (request, response) => {
  const { talk } = request.body;
  const { id } = request.params;

  if (!DataValidator(talk.watchedAt)) {
    return response.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  return response.status(200).json(postTalkerId(request.body, id));
};

module.exports = { validateAge, validationId };
