import React, { Component } from 'react';
import { connect } from "react-redux";

import "./Container.css";

import ParamItem from "./PARAM_Item.js";
import Table from "react-bootstrap/Table";

class PARAM_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateRows() {
        let rows = [];
        for (let i in this.props.parameters) {
            rows.push(
                <ParamItem key={i} id={i}/>
            );
        }
        return (
            rows
        );
    }

    render() {
        return (
            <div className="Container">
                <h3>User Input (PARAM)</h3>
                <Table bordered striped>
                <thead>
                    <tr>
                        <td>#</td>
                        <th>Table</th>
                        <th>Field</th>
                        <th>Is</th>
                        <th>Name of Parameter</th>
                        <th>Data Type</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateRows()}
                </tbody>
                </Table>
                <button onClick={this.props.add}>Add Parameter</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    parameters: state.parameters
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_item",
        payload: {type: "parameter"}
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Container);
