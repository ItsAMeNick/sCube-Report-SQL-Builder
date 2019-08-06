import React, { Component } from 'react';
import { connect } from "react-redux";

import accela_schema from "./accela_schema.js";

import "./Container.css";

import Form from "react-bootstrap/Form";

let schema = accela_schema.accela_data;

class FIELD_Container extends Component {
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

    handleChange() {

    }

    render() {
        return (
            <tr>
                <td><Form.Control id={"table-"+this.props.id} as="select" onChange={this.handleChange()}>
                    {this.getAccelaTables()}
                </Form.Control></td>
                <td><Form.Control id={"field_name-"+this.props.id} as="select" onChange={this.handleChange()}>
                    {this.getAccelaFields(this.props.fields[this.props.id].table)}
                </Form.Control></td>
                <td><Form.Control id={"report_name-"+this.props.id} readOnly value={this.props.fields[this.props.id].report_name}></Form.Control></td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    fields: state.fields
});

const mapDispatchToProps = dispatch => ({
    update: item => dispatch({
        type: "update_item",
        payload: item
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FIELD_Container);
