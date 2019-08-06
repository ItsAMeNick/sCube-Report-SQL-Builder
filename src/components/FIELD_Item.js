import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import "./Container.css";

import Form from "react-bootstrap/Form";

import accela_schema from "./accela_schema.js";
let schema = accela_schema.accela_data;

class FIELD_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newItem = _.cloneDeep(this.props.fields[this.props.id]);
        let type = event.target.id.split("-")[0];

        newItem[type] = event.target.value;
        this.props.update(this.props.id, newItem);
    }

    getAccelaTables() {
        let tables = [""].concat(Object.keys(schema));
        tables = tables.map(t => {
            return <option key={t} label={t} value={t}/>
        });
        return tables;
    }

    getAccelaFields(table) {
        if (!table) return <option/>;
        let fields = [""].concat(Object.keys(schema[table].data));
        fields = fields.map(f => {
            return <option key={f} label={f} value={f}/>
        });
        return fields;
    }

    render() {
        return (
            <tr>
                <td><Form.Control id={"table-"+this.props.id} as="select" onChange={this.handleChange}>
                    {this.getAccelaTables()}
                </Form.Control></td>
                <td><Form.Control id={"field-"+this.props.id} as="select" onChange={this.handleChange}>
                    {this.getAccelaFields(this.props.fields[this.props.id].table)}
                </Form.Control></td>
                <td><Form.Control id={"report-"+this.props.id} readOnly value={this.props.fields[this.props.id].report_name}></Form.Control></td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    fields: state.fields
});

const mapDispatchToProps = dispatch => ({
    update: (myRef, newItem) => dispatch({
        type: "update_item",
        payload: {
            type: "fields",
            ref: myRef,
            item: newItem
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(FIELD_Container);
