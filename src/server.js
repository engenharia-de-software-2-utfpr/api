
const { HOST, PORT } = require('./env');
const app = require('./app');
require('./utils/mongoose');

app.listen(PORT, HOST, () => {
  console.log(`Servidor executando em ${HOST}:${PORT}`);
});
