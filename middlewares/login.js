function geraStringAleatoria() {
  let stringAleatoria = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let index = 0; index < 16; index += 1) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return stringAleatoria;
}

/* Source geraStringAleatoria:
  https://www.webtutorial.com.br/funcao-para-gerar-uma-string-aleatoria-random-com-caracteres-especificos-em-javascript/ */

const isEmailValid = (email) => {
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regexEmail.test(email);
};

/* Source isEmailValid:
  https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript */

const login = (request, response) => {
  const { email, password } = request.body;
  if (!email) {
    response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (isEmailValid(email) === false) {
    response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length <= 5) {
    response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  response.status(200).send(`{ "token": "${geraStringAleatoria()}" }`);
};

module.exports = login;
