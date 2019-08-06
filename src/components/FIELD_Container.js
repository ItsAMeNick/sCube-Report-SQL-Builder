import React, { Component } from 'react';
import { connect } from "react-redux";

import accela_schema from "./accela_schema.js";

import "./Container.css";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

let schema = accela_schema.accela_data;

class CORE_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getAccelaTables() {
        let tables = [""].concat(Object.keys(schema));
        tables = tables.map(t => {
            return <option key={t} label={t}/>
        });
        return tables;
    }

    getAccelaFields(table) {
        if (!table) return <option/>;
        let fields = [""].concat(Object.keys(schema[table].data));
        fields = fields.map(f => {
            return <option key={f} label ={f}/>
        });
        return fields;
    }

    generateRows() {
        return (
            <tr>
                <td><Form.Control as="select">
                    {this.getAccelaTables()}
                </Form.Control></td>
                <td><Form.Control as="select">
                    {this.getAccelaFields("Permit Information")}
                </Form.Control></td>
                <td><Form.Control readOnly></Form.Control></td>
            </tr>
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
                <button>Add Item</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Container);
