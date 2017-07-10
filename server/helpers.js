
// getting the date from 1 month
exports.getDateAMonthAgo = function() {
    var d = new Date();
	d.setMonth(d.getMonth() - 1);
	return d.toISOString().slice(0,10);
};


// formating stocks data to proper data structure
// to make it easier for chart to consume it
exports.formatStocks = function(data, symbol) {

    var series = [], dates = [];

    data.dataset_data.data.forEach(serie => {
        series.push(...serie.slice(1, 2));
        dates.push(...serie.slice(0, 1));
    })

    
    return {
        symbol,
        series,
        dates
    }
}