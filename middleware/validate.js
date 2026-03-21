const validator = require('../helpers/validate');

const saveAuthor = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    birthDate: 'required|string',
    nationality: 'required|string',
    mostFamousWork: 'required|string',
    awardsCount: 'required|integer',
    isActive: 'required|boolean'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveGenre = (req, res, next) => {
  const validationRule = {
    genreName: 'required|string',
    description: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {saveAuthor, saveGenre};

