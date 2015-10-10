var MockController  = function MockController (){};

var BiteService = require('../services/bite_service');
var TrapService = require('../services/trap_service');

MockController.postMockBites = function getMain(req, res, next) {

    var mockData = MockController.generateBites();
    for(var i = 0; i < mockData.length; i++) {
        BiteService.saveBite("1Ah61LeHbf", mockData[i].lat, mockData[i].long);
    }
    res.json(mockData);
    next();
};

MockController.postMockTraps = function getMain(req, res, next) {

    var mockData = MockController.generateTraps();
    for(var i = 0; i < mockData.length; i++) {
        TrapService.saveTrap("1Ah61LeHbf", mockData[i].lat, mockData[i].long, "active");
    }
    res.json(mockData);
    next();
};

MockController.getRandomArbitrary = function(min, max) {
    return Math.random() * (max - min) + min;
};

MockController.getRandomCoord = function() {
    var c = new MockCoords(45.5463866, 18.6538395);
    var top = new MockCoords(45.570478, 18.694974);
    var bottom = new MockCoords(45.536768, 18.688773);
    var left = new MockCoords(45.584776, 18.568803);
    var right = new MockCoords(45.539947, 18.782178);

    var topL = top.lat;
    var bottomL = bottom.lat;
    var leftL = left.long;
    var rightL = right.long;

    return new MockCoords(this.getRandomArbitrary(bottomL, topL), this.getRandomArbitrary(leftL, rightL));
};

MockController.getRandomCoordInRadius = function(center, radius) {
    return new MockCoords(this.getRandomArbitrary(center.lat - radius / 2, center.lat + radius / 2), this.getRandomArbitrary(center.long - radius / 2, center.long + radius / 2))
};

MockController.generateTraps = function() {
    var coords = [];
    for (var i = 0; i < 10; i++) {
        coords[i] = this.getRandomCoord();
    }
    return coords;
};

MockController.generateBites = function() {
    var coords = [];
    var k = 0;
    for (var i = 0; i < 10; i++) {
        var center = this.getRandomCoord();
        var radius = this.getRandomArbitrary(0.03371/4, 0.03371/2);
        var number = this.getRandomArbitrary(80, 120);
        for(var j = 0; j < number; j++) {
            coords[k] = this.getRandomCoordInRadius(center, radius);
            k++;
        }
    }
    return coords;
};

function MockCoords(lat, long) {
    this.lat = lat;
    this.long = long;
}

module.exports = MockController;
