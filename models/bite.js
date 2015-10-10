var BiteModel = function BiteModel() {};

BiteModel.getBite = function getBite(parseBite) {

  return {
    userId: parseBite.user ? parseBite.user.objectId : '',
    lat: parseBite.geo.latitude,
    long: parseBite.geo.longitude
  };
};

BiteModel.createParseBite = function createParseBite(userId, lat, long) {

  return {
    geo: {
      __type: 'GeoPoint',
      latitude: lat,
      longitude: long
    },
    type: 'bite',
    user: {
      __type: 'Pointer',
      className: '_User',
      objectId: userId || ''
    }
  };
};

module.exports = BiteModel;
