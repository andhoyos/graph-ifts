const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/informe-siniestros', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'informe-siniestros.html'));
});

app.listen(process.env.PORT || 3300, () => {
  console.log('Servidor web en ejecución en http://localhost:3300');
});
