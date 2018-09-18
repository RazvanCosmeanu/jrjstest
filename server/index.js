const express = require('express');

const show = require('./show.json');
const corsMiddleware = require('./corsMiddleware.js');
const sanitizeQueryParam = require('./sanitizeQueryParam.js');

const episodes = show['_embedded']['episodes'];

const app = express();

app.use(corsMiddleware);

const episodesQueryValidators = {
  season: query => /^([0-9]{1,2})$/.test(query)
};

const sanitizeEpisodesQuery = sanitizeQueryParam(episodesQueryValidators);

app.get('/api/episodes', sanitizeEpisodesQuery, (req, res) => {
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

module.exports = app;
