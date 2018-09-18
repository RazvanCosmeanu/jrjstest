/*
const queryValidators = {
  queryKey: (query) => predicate(query)
}
*/

const falsey = () => false;

module.exports = queryValidators => (req, res, next) => {
  for (let param in req.query) {
    const validator = queryValidators[param] || falsey;

    if (param && !validator(req.query[param])) {
      return res.status(422).send({ error: 'Invalid query param.' });
    }
  }

  next();
};
