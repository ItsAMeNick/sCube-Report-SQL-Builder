import React, { Component } from 'react';
import { connect } from "react-redux";

import "./Container.css";

import FilterItem from "./FILTER_Item.js";
import Table from "react-bootstrap/Table";

class Filter_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateRows() {
        let rows = [];
        for (let i in this.props.filters) {
            rows.push(
                <FilterItem key={this.props.filters[i].key} id={this.props.filters[i].key} req={this.props.filters[i].req}/>
            );
        }
        return (
            rows
        );
    }

    render() {
        return (
            <div className="Container">
                <h3>Filters (FILTER)</h3>
                <Table bordered striped>
                <thead>
                    <tr>
                        <th>Table</th>
                        <th>Field</th>
                        <th>Is</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateRows()}
                </tbody>
                </Table>
                <button onClick={this.props.add}>Add Filter</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    filters: state.filters
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_item",
        payload: {type: "filter"}
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter_Container);
