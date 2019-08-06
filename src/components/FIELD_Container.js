import React, { Component } from 'react';
import { connect } from "react-redux";

import "./Container.css";

import FieldItem from "./FIELD_Item.js"
import Table from "react-bootstrap/Table";

class FIELD_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateRows() {
        let rows = [];
        for (let i in this.props.fields) {
            rows.push(
                <FieldItem key={i} id={i}/>
            );
        }
        return (
            rows
        );
    }

    render() {
        return (
            <div className="Container">
                <h3>Data Selection (FIELD)</h3>
                <Table bordered striped>
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Field</th>
                        <th>Report Variable Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateRows()}
                </tbody>
                </Table>
                <button onClick={() => {this.props.add({type: "field"})}}>Add Item</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    fields: state.fields
});

const mapDispatchToProps = dispatch => ({
    add: item => dispatch({
        type: "add_item",
        payload: item
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FIELD_Container);
