import React, { Component } from 'react';
import { connect } from "react-redux";

import "./Container.css";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

class PARAM_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateRows() {
        return (
            <Table bordered striped>
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Data Type</th>
                    <th>Report Variable Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><Form.Control/></td>
                    <td><Form.Control as="select"><option label="Text"/></Form.Control></td>
                    <td><Form.Control readOnly></Form.Control></td>
                </tr>
            </tbody>
            </Table>
        );
    }

    render() {
        return (
            <div className="Container">
                <h3>Parameter Setup</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Container);
