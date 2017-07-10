const axios = require('axios');
const API_KEY = require('../config').apiKey;
const Stock = require('../models/Stock');
const {getDateAMonthAgo, formatStocks} = require('../helpers');

// adds stock 
function addStock(symbol, io, socket) {
    Stock.findOne({symbol: symbol})
        .then((stock) => {
            if(!stock) {
                const stock = new Stock({symbol: symbol})
                stock.save()
                    .then((stock) => {
                         axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${stock.symbol}/data.json?api_key=${API_KEY}&order=asc&start_date=${getDateAMonthAgo()}`)
                            .then((response) => {
                                io.sockets.emit('add-stock', formatStocks(response.data, stock.symbol));
                            })
                            .catch(() => {
                                // if symbol is invalid, remove it from the database
                                Stock.findOneAndRemove({symbol: symbol})
                                    .then(() => socket.emit('failure', 'Invalid symbol!'));
                            });
                    })
            } else {
                socket.emit('failure', 'Already exists!')
            }
        })
}

module.exports = addStock;