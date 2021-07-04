const express = require('express');
const app = express();
const data = require('./dataCowork.json');
const cities = require('./dataCity');
const port = process.env.PORT || 8080;

app.get('/', (request, response) => {
  response.send('Hello, welcome Hackton X fievrr API');
});

app.get('/datacowork', (request, response) => {
  response.status(200).json(data.results);
});

app.get('/cities', (request, response) => {
  response.status(200).json(cities.results);
});

app.get('/datacowork/:id', (request, response) => {
  const dataCowork = data.results.find((d) => d.id == request.params.id);
  if (dataCowork) {
    response.status(200).send(dataCowork);
  } else {
    res.status(404).send(`not found...`);
  }
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Express server listening on ${port}`);
  }
});
