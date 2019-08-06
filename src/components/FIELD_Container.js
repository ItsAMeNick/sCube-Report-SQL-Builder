import React, { Component } from 'react';
import { connect } from "react-redux";

import "./Container.css";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

class CORE_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateTables() {
        return (
            <Table bordered striped>
            <thead>
                <tr>
                    <th>Field</th>
                    <th>Report Variable Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><Form.Control as="select"><option/></Form.Control></td>
                    <td><Form.Control readOnly></Form.Control></td>
                </tr>
            </tbody>
            </Table>
        );
    }

    render() {
        return (
            <div className="Container">
                <h3>Data Selection</h3>
                {this.generateTables()}
                <button>Add Source</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Container);
