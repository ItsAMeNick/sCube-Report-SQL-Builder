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

        //Update this field
        newItem[type] = event.target.value;
        this.props.update(this.props.id, newItem);

        //Handle required Filters - Maybe move to another function
        if (type === "field") {
            let required_fields = schema[this.props.fields[this.props.id].table].required
            if (required_fields) {
                let keys = Object.keys(required_fields);
                for (let r in keys) {
                    let filterRef = "R-" + this.props.id + "-" + keys[r];
                    var newFilter = {
                                    key: filterRef,
                                    req: true,
                                    table: this.props.fields[this.props.id].table,
                                    field: keys[r],
                                    comparison: "",
                                    value: ""
                                    };
                    if (keys[r] === "ASI Field Name") {
                        newFilter.comparison = "==";
                    }

                    if (!this.props.filters[filterRef]) {
                        this.props.addFilter(filterRef, newFilter);
                    } else {
                        this.props.requireFilter(filterRef, newFilter);
                    }
                }
            }
        } else if (type === "table") {
            //If the table changes remove any required filters associated with this field
            if (this.props.fields[this.props.id].table) {
                let required_fields = schema[this.props.fields[this.props.id].table].required
                if (required_fields) {
                    let keys = Object.keys(required_fields);
                    for (let r in keys) {
                        let filterRef = "R-" + this.props.id + "-" + keys[r];
                        if (this.props.filters[filterRef]) {
                            console.log(filterRef);
                            this.props.deleteFilter(filterRef);
                        }
                    }
                }
            }
        }
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
                <td>{this.props.id}</td>
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
    fields: state.fields,
    filters: state.filters
});

const mapDispatchToProps = dispatch => ({
    update: (myRef, newItem) => dispatch({
        type: "update_item",
        payload: {
            type: "fields",
            ref: myRef,
            item: newItem
        }
    }),
    requireFilter: (myRef, newItem) => dispatch({
        type: "update_item",
        payload: {
            type: "filter",
            ref: myRef,
            item: newItem
        }
    }),
    addFilter: (newRef, newItem) => dispatch({
        type: "add_specific_filter",
        payload: {
            ref: newRef,
            item: newItem
        }
    }),
    deleteFilter: (ref) => dispatch({
        type: "delete_item",
        payload: {
            type: "filters",
            ref: ref
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(FIELD_Container);
