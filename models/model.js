var MainModel = function MainModel() {};

MainModel.createMain = function createMain(message) {
  return {'name': message};
};

module.exports = MainModel;