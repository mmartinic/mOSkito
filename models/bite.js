var BiteModel = function BiteModel() {};

BiteModel.getBite = function create(parseBite) {

  return {
    userId: parseBite.user.objectId,
    long: parseBite.geo.longitude,
    lat: parseBite.geo.latitude
  };
};

BiteModel.createParseBite = function createParseBite(userId, lat, long) {

  return {
    geo: {
      __type: 'GeoPoint',
      "latitude": lat,
      "longitude": long
    },
    'type': 'bite',
    "user": {
      __type: 'Pointer',
      className: '_User',
      objectId: userId || ''
    }
  };
};

module.exports = BiteModel;
