import React, { Component } from 'react';
import io from 'socket.io-client';


// importing components
import Chart from './Chart';
import Input from './Input';
import Remove from './Remove';


const socket = io('https://stock-market-mon.glitch.me/');


export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  getStocks(data) {
    this.setState({data: data});
  }

  handleAdding(e) {
    e.preventDefault();
    const symbol = document.getElementById('symbol').value;
    document.getElementById('symbol').value = '';
    socket.emit('add-stock', symbol)
  }

  handleRemoval(symbol) {
    socket.emit('remove-stock', symbol);
  }


  removeStock(symbol) {
    var updated = this.state.data.filter(stock => stock.symbol !== symbol);
    this.setState({data: updated});
  }

  addStock(data) {
    var updated = this.state.data.concat([data]);
    this.setState({data: updated});
  }

  renderButtons() {
    return this.state.data.map(stock => {
      return <Remove handleRemoval={this.handleRemoval.bind(this)} key={stock.symbol} symbol={stock.symbol} />
    });
  }

  componentDidMount() {
    socket.on('connected', function(data) {
      console.log(data);
    })
    socket.on('get-stocks', this.getStocks.bind(this));
    socket.on('failure', function(data) {
      alert(data)
    });

    socket.on('remove-stock', this.removeStock.bind(this));
    socket.on('add-stock', this.addStock.bind(this));
  }

  render() {
    return (
      <div className="container">
        <a className="button is-black is-pulled-right" href="https://github.com/alan2207/stock-market-monitor" target="_blank" >Repository</a>
        <h1 className="title is-3">Stock Market Monitor</h1>
        <hr />
        <p>{this.state.symbol}</p>
        <Chart data={this.state.data} />
        <hr />
        <Input handleAdding={this.handleAdding.bind(this)}/> 
        <hr />
       {this.renderButtons()}
      </div>
    );
  }
}
