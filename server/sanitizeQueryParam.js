const paramsValidators = {
  season: query => /^([0-9]{1,2})$/.test(query)
};

const falsey = () => false;

module.exports = (req, res, next) => {
  for (let param in req.query) {
    const validator = paramsValidators[param] || falsey;

    if (param && !validator(req.query[param])) {
      return res.status(422).send({ error: 'Invalid query param.' });
    }
  }

  next();
};
