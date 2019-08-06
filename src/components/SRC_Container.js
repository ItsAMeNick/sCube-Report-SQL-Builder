import React, { Component } from 'react';
import { connect } from "react-redux";

import accela_schema from "./accela_schema.js";

import "./Container.css";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

let schema = accela_schema.accela_data;

class SRC_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getNamesAccela() {
        let names = [""].concat(Object.keys(schema));
        names = names.map(n => {
            return <option key={n} label={n}/>
        })
        return names;
    }

    getReference() {
        return "NONE";
    }

    generateTables() {
        let tables = [];
        for (let t in ["", ""]) {
            tables.push(
                <div key={t}>
                    <Table bordered>
                    <tbody>
                        <tr>
                            <th>Table</th>
                            <td><Form.Control as="select">{this.getNamesAccela()}</Form.Control></td>
                            <td><Form.Control readOnly value={this.getReference()}></Form.Control></td>
                        </tr>
                    </tbody>
                    </Table>
                    <Table bordered striped>
                        <thead>
                        <tr>
                            <th>Field</th>
                            <th>Is</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.generateRows()}
                        </tbody>
                    </Table>
                    <button>Add Condition</button>
                    <hr className="darkHR"/>
                </div>
            );
        }
        return (
            tables
        );
    }

    generateRows(table) {
        let conditions = [];
        for (let c in ["", ""]) {
            conditions.push(<tr key={c}>
                <td><Form.Control as="select"><option label="First Name"/></Form.Control></td>
                <td><Form.Control as="select"><option label="Equal To"/></Form.Control></td>
                <td><Form.Control as="select"><option label="Nick Zoner"/></Form.Control></td>
            </tr>)
        }
        return (
            conditions
        );
    }

    render() {
        return (
            <div className="Container">
                <h3>Source Set-Up</h3>
                <hr className="darkHR"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SRC_Container);
