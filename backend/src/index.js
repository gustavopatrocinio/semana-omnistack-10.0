const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebockect } = require('./websocket');

const app = express();
//extraindo servidor http do express para trabalhar com o servidor diretamente
const server = http.Server(app); 

setupWebockect(server); 

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-hjygu.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);