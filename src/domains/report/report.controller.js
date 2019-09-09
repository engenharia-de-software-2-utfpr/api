const models = require('../../models');

const add = async (req, res, next) => {
  try {

  } catch (error) {

  }
};

const get = async (req, res, next) => {
  try {
    const data = await models.Report.find({});
    res.json({ message: 'DATA_FOUND', data });
  } catch (error) {
    next(error);
  }
};

module.exports = { add, get };
