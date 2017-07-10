import React from 'react';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        this.props.handleAdding(e);
    }

    render() {
        return (
            <div className="columns">
                <form onSubmit={this.handleSubmit.bind(this)} className="field has-addons column is-4 is-offset-4">
                    <p className="control">
                        <input required id="symbol" className="input" type="text" placeholder="Search stocks..." name="stock" />
                    </p>
                    <p className="control">
                        <button className="button is-black">
                            Add
                        </button>
                    </p>
                </form>
            </div>
        )
    }
}