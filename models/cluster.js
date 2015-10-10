var ClusterModel = function ClusterModel() {};

ClusterModel.createCluster = function createCluster(lat, long, radius, number) {
    return {
        lat: lat,
        long: long,
        radius: radius,
        number: number
    };
};

module.exports = ClusterModel;
