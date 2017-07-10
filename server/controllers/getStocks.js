const axios = require('axios');
const API_KEY = require('../config').apiKey;
const Stock = require('../models/Stock');
const {getDateAMonthAgo, formatStocks} = require('../helpers');


// fetching stocks from the API
async function getStocks(socket) {
    // get stock entries from MongoDB
    const stocks = await Stock.find();

    // store fethced data here:
    const data = [];

    // loop through stored stocks
    for(let i = 0; i < stocks.length; i++) {
            
        let val = await axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${stocks[i].symbol}/data.json?api_key=${API_KEY}&order=asc&start_date=${getDateAMonthAgo()}`);
        data.push(formatStocks(val.data, stocks[i].symbol));
            
    }

    // return the data:
    return data;
}


module.exports = getStocks;