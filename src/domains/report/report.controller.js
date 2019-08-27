const models = require('../../models');

const add = async (req, res) => {
  const report = await new models.Report({ description: 'Lorem Ipsum' }).save();
  res.json(report);
};

const get = async (req, res) => {
  res.json(await models.Report.find({}));
};

module.exports = { add, get };
