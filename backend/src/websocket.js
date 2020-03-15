const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebockect = (server) => {
    io = socketio(server);

    io.on('connection', socket => {
        console.log(socket.id);
        //recebendo os parâmetros enviado do backend
        const { latitude, longitude, techs } = socket.handshake.query;

        if (techs) {
            connections.push({
                id: socket.id,
                coordinates: {
                    latitude: Number(latitude),
                    longitude: Number(longitude),
                },
                techs: parseStringAsArray(techs),
            });
        }
    });
};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}