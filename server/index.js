const express = require('express');
const show = require('./show.json');
const sanitizeQueryParam = require('./sanitizeQueryParam.js');

const episodes = show['_embedded']['episodes'];

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/api/episodes', sanitizeQueryParam, (req, res) => {
  const season = req.query['season'];
  const payload = season
    ? episodes.filter(episode => {
        return episode['season'] == season;
      })
    : episodes;

  res.send(payload);
});

const PORT = 5000;
app.listen(PORT);
