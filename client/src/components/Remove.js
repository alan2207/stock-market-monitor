import React from 'react';


export default class Remove extends React.Component {
    
    constructor(props) {
        super(props);
    }

    handleClick() {
        this.props.handleRemoval(this.props.symbol);
    }

    render() {
        return (
            <span className="tag is-black is-medium">
                {this.props.symbol}
                <button onClick={this.handleClick.bind(this)} className="delete is-small"></button>
            </span>
        )
    }
}