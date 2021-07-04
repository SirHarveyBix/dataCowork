const express = require('express');
const app = express();
const data = require('./dataCowork.json');
const cities = require('./dataCity');
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello, welcome Hackton X fievrr API');
});

app.get('/datacowork', (req, res) => {
  res.status(200).json(data.results);
});

app.get('/cities', (req, res) => {
  res.status(200).json(cities.results);
});

app.get('/datacowork/:id', (req, res) => {
  const dataCowork = data.results.find((d) => d.id == req.params.id);
  if (dataCowork) {
    res.status(200).send(dataCowork);
  } else {
    res.status(404).send(`not found...`);
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${port}`);
  }
});
