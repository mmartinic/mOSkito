var BiteService = function BiteService(){};
var Bite = require('../models/bite');
var parseApp = require('../helpers/parseApp');
var rsvp = require('rsvp');

BiteService.saveBite = function saveBite(userId, lat, long){
  var parseBite = Bite.createParseBite(userId, lat, long);
  return saveBiteToParse(parseBite);
};

BiteService.saveParseBite = function saveParseBite(parseBite){
  return saveBiteToParse(parseBite);
};

//helpers
function saveBiteToParse(parseBite){
  return new rsvp.Promise(function (resolve, reject){
    parseApp.insert('bite', parseBite, function (err, response) {
      err ? reject(err) : resolve(response);
    });
  });

}

module.exports = BiteService;
