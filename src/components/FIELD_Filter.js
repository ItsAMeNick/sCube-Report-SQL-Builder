import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import "./Container.css";

import Form from "react-bootstrap/Form";

import accela_schema from "./accela_schema.js";
let schema = accela_schema.accela_data;

class FIELD_Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newItem = _.cloneDeep(this.props.filters[this.props.id]);
        let type = event.target.id.split("-")[0];

        if (type === "group") {
            if (event.target.value) {
                this.props.add2Group(event.target.value, this.props.id);
            }
        }

        newItem[type] = event.target.value;
        this.props.update(this.props.id, newItem);

        if (type === "value") {
            this.props.updateReportName(this.props.id.split("-")[1], event.target.value);
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

    getGroups(table) {
        //Good God, Get a Group Gurl
        if (!table) return <option/>
        let groups = this.props.groups;
        let keys = Object.keys(groups);
        keys = keys.filter(k => {
            return (groups[k].table === table)
        });
        keys = [""].concat(keys);
        keys = keys.map(k => {
            return <option label={k} value={k} key={k}/>
        });
        return keys;
    }

    render() {
        return (
            <tr style={{"backgroundColor": "#FBBBB9"}}>
                <td>{this.props.id.split("-")[0] + "\u2011" + this.props.id.split("-")[1]}</td>
                <td>
                    <Form.Control id={"field-name-"+this.props.id} value={this.props.filters[this.props.id].field} readOnly onChange={this.handleChange}/>
                </td>
                <td><Form.Control id={"comparison-"+this.props.id} as="select" value={this.props.filters[this.props.id].comparison} onChange={this.handleChange}>
                    <option label="" value=""/>
                    <option label="Equal To" value="=="/>
                    <option label="Not Equal To" value="!="/>
                </Form.Control></td>
                <td><Form.Control id={"value-"+this.props.id} value={this.props.filters[this.props.id].value} placeholder="Value of Field" onChange={this.handleChange}/></td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    filters: state.filters,
    groups: state.groups
});

const mapDispatchToProps = dispatch => ({
    update: (myRef, newItem) => dispatch({
        type: "update_item",
        payload: {
            type: "filters",
            ref: myRef,
            item: newItem
        }
    }),
    add2Group: (group, myRef) => dispatch({
        type: "add_to_group",
        payload: {
            type: "filters",
            group: group,
            ref: myRef
        }
    }),
    updateReportName: (myRef, myBase) => dispatch({
        type: "update_report_name",
        payload: {
            ref: myRef,
            base: myBase
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(FIELD_Filter);
