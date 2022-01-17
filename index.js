const express = require('express');
const bodyParser = require('body-parser');

// Requisito 1
const talker = require('./middlewares/talker');

// Requisito 2
const talkerId = require('./middlewares/talkerId');
// Requisito 3
const login = require('./middlewares/login');

// Requisito 4
const {
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  allValidation,
} = require('./middlewares/postTalker');
/* const tokenValidation = require('./middlewares/postTalker');
const nameValidation = require('./middlewares/postTalker');
const ageValidation = require('./middlewares/postTalker');
const talkValidation = require('./middlewares/postTalker');
const AllValidation = require('./middlewares/postTalker'); */

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);
app.get('/talker/:id', talkerId);
app.post('/login', login);
app.post('/talker', tokenValidation, nameValidation, ageValidation, talkValidation, allValidation);

app.listen(PORT, () => {
  console.log('Online');
});
