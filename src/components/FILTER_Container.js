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
        let filters = Object.keys(this.props.filters);
        filters = filters.sort((a, b) => {
            if (this.props.filters[a].req) {
                return -1;
            }
            if (this.props.filters[b].req) {
                return 1;
            }
            return 0;
        });
        for (let i in filters) {
            rows.push(
                <FilterItem key={this.props.filters[filters[i]].key} id={this.props.filters[filters[i]].key} req={this.props.filters[filters[i]].req}/>
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
