import React, { Component } from 'react';
import { connect } from "react-redux";

import "./Container.css";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

class Filter_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateRows() {
        return (
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
                <tr>
                    <td><Form.Control as="select"><option label="Permit Information"/></Form.Control></td>
                    <td><Form.Control as="select"><option label="Record ID"/></Form.Control></td>
                    <td><Form.Control as="select"><option label="Equal To"/></Form.Control></td>
                    <td><Form.Control></Form.Control></td>
                </tr>
            </tbody>
            </Table>
        );
    }

    render() {
        return (
            <div className="Container">
                <h3>Filters (FILTER)</h3>
                {this.generateRows()}
                <button>Add Source</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter_Container);
