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

// Requisito 5
const { validationId, validateAge } = require('./middlewares/postTalkerId');

// Requisito 6
const deleteTalkerId = require('./middlewares/deleteTalkerId');

// Requisito 7
const talkerSearch = require('./middlewares/talkerSearch');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talker);
app.get('/talker/search', tokenValidation, talkerSearch);
app.get('/talker/:id', talkerId);
app.post('/login', login);
app.post('/talker', tokenValidation, nameValidation, ageValidation, talkValidation, allValidation);
app.put(
  '/talker/:id',
  tokenValidation,
  nameValidation,
  validateAge,
  talkValidation,
  validationId,
);
app.delete('/talker/:id', tokenValidation, deleteTalkerId);

app.listen(PORT, () => {
  console.log('Online');
});
