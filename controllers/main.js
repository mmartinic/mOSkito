var MainController  = function MainController (){};

var MainModel = require('../models/model');

MainController.getMain = function getMain(req, res, next) {

  res.json(MainModel.createMain('hellou test'));
  next();
};

module.exports = MainController;