import socketio from 'socket.io-client';

const socket = socketio('http://10.0.0.100:3333', {
    autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction){
    socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs){
    //enviando os parâmetros para o backend
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    }
    socket.connect();
}

function disconnect(){
    if(socket.connect()){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
};