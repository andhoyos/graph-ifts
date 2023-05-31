const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/informe-siniestros', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'informe-siniestros.html'));
});

app.get('/api/data', (req, res) => {
  const dataPath = path.join(__dirname, 'public', 'data.json');

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al leer el archivo de datos');
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al procesar los datos');
    }
  });
});

const port = process.env.PORT || 8080;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Servidor en ejecución en el puerto:', port);
  }
});
