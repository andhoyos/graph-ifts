const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3300, () => {
  console.log('Servidor web en ejecución en http://localhost:3300');
});