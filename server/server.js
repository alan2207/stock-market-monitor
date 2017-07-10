
// importing config file:
const config = require('./config');

const getStocks = require('./controllers/getStocks');
const addStock = require('./controllers/addStock');

// initializing express:
const express = require('express');
const app = express();

// initializing socket.io:
const http = require('http').createServer(app);
const io = require('socket.io')(http);


// initializing mongoose
// connect to MongoDB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
    useMongoClient: true
});

const Stock = require('./models/Stock');


// connecting to socket
io.on('connection', function(socket) {
    io.sockets.emit('connected', 'connected')

    // get stocks when connected, and emit it to the client
    getStocks().then((data) => socket.emit('get-stocks', data));

    socket.on('add-stock', function(data) {
        addStock(data, io, socket);
    });

    // removing stock
    socket.on('remove-stock', function(data) {
        Stock.findOneAndRemove({symbol: data})
            .then(() => {
                console.log('removed');
                io.sockets.emit('remove-stock', data);
            });
    })
});



// initializing the server:
const port = process.env.PORT || config.port;
http.listen(port, function() {
    console.log(`Listening on port ${port}`);
})