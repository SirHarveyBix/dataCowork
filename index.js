const express = require('express');
const app = express();
const cors = require('cors');
const cities = require('./dataCity.json');
const data = require('./dataCowork.json');
const port = process.env.PORT || 8080;

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested, Content-Type, Accept Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PATCH, GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, here is th API made for hackathon X fievrr project');
});

app.get('/cowork', (req, res) => {
  res.status(200).json(data.results);
  console.log(results);
});

app.get('/cities', (req, res) => {
  res.status(200).json(cities.results);
});

app.get('/cowork/:id', (req, res) => {
  const cowork = data.results.find((d) => d.id == req.params.id);
  if (cowork) {
    res.status(200).send(cowork);
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
