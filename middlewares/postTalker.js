const fs = require('fs');

function DataValidator(data) {
  const RegExpData = /^([0-3][0-1]|[0-2]\d)\/(0[1-9]|1[0-2])\/\d{4}/;
  return RegExpData.test(data);
}

/* Source dateRegex:
  https://www.delftstack.com/pt/howto/javascript/javascript-validate-date/ */

const consoleErro = (err) => {
  if (err) {
    return console.error(err);
  }
};

const postTalker = (theRequest) => {
  const { name, age, talk } = theRequest;
  const { watchedAt, rate } = talk;
  const readJson = JSON.parse(fs.readFileSync('./talker.json'));
  const id = readJson.length + 1;
  const newJson = { name, age, id, talk: { watchedAt, rate } };
  readJson.push(newJson);

  fs.writeFile('./talker.json', JSON.stringify(readJson), (err) => consoleErro(err));
  return newJson;
};

const tokenValidation = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return response.status(401).json({ message: 'Token inválido' });
  next();
};

const nameValidation = (request, response, next) => {
  const { name } = request.body;
  if (!name) return response.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidation = (request, response, next) => {
  const { age } = request.body;
  if (!age) return response.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (!Number.isInteger(age) || age < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkValidation = (request, response, next) => {
  const { talk } = request.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return response.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios', 
    });
  }

  next();
};

const allValidation = (request, response) => {
  const { talk } = request.body;

  if (!DataValidator(talk.watchedAt)) {
    return response.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return response.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  return response.status(201).json(postTalker(request.body));
};

module.exports = {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  allValidation,
};