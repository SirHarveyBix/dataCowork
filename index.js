const express = require('express');
const app = express();
const data = require('./alien.json');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, welcom to alien API');
});
app.get('/alien', (req, res) => {
  res.status(200).json(data.results);
});

app.get('/alien/:id', (req, res) => {
  const alien = data.results.find((d) => d.id == req.params.id);

  if (alien) {
    res.status(200).send(alien);
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
