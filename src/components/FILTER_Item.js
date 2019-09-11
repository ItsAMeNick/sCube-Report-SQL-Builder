import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import "./Container.css";

import Form from "react-bootstrap/Form";

import accela_schema from "./accela_schema.js";
let schema = accela_schema.accela_data;

class FILTER_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newItem = _.cloneDeep(this.props.filters[this.props.id]);
        let type = event.target.id.split("-")[0];
        if (type === "group") {
            if (event.target.value === "New") {
                this.props.addGroup(this.props.filters[this.props.id].table, this.props.id);
            } else if (event.target.value) {
                this.props.add2Group(event.target.value, this.props.id);
            }
        }

        if (type !== "group") {
            newItem[type] = event.target.value;
            this.props.update(this.props.id, newItem);
        }
        this.props.validateGroups();
    }

    getAccelaTables() {
        let tables = [""].concat(Object.keys(schema));
        tables = tables.sort();
        tables = tables.map(t => {
            return <option key={t} label={t} value={t}/>
        });
        return tables;
    }

    getAccelaFields(table) {
        if (!table) return <option/>;
        let fields = [""].concat(Object.keys(schema[table].data));
        fields = fields.sort();
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
        keys = [""].concat(keys).concat(["New"]);
        keys = keys.map(k => {
            return <option label={k} value={k} key={k}/>
        });
        return keys;
    }

    render() {
        return (
            <tr>
                { this.props.req ? <React.Fragment>
                    <td>{this.props.id.split("-")[0] + "-" + this.props.id.split("-")[1]}</td>
                    <td>
                        <Form.Control id={"table-name-"+this.props.id} value={this.props.filters[this.props.id].table} readOnly onChange={this.handleChange}/>
                    </td>
                    <td>
                        <Form.Control id={"field-name-"+this.props.id} value={this.props.filters[this.props.id].field} readOnly onChange={this.handleChange}/>
                    </td>
                </React.Fragment> : <React.Fragment>
                    <td>{this.props.id}</td>
                    <td><Form.Control id={"table-name-"+this.props.id} as="select" onChange={this.handleChange}>
                        {this.getAccelaTables()}
                    </Form.Control></td>
                    <td><Form.Control id={"field-name-"+this.props.id} as="select" onChange={this.handleChange}>
                        {this.getAccelaFields(this.props.filters[this.props.id].table)}
                    </Form.Control></td>
                </React.Fragment> }
                <td><Form.Control id={"comparison-"+this.props.id} as="select" value={this.props.filters[this.props.id].comparison} onChange={this.handleChange}>
                    <option label="" value=""/>
                    <option label="Equal To" value="=="/>
                    <option label="Not Equal To" value="!="/>
                </Form.Control></td>
                <td><Form.Control id={"value-"+this.props.id} value={this.props.filters[this.props.id].value} onChange={this.handleChange}/></td>
                { this.props.req ? <React.Fragment>
                    <td><Form.Control id={"group-filter-"+this.props.id} readOnly value={this.props.filters[this.props.id].group} onChange={this.handleChange}>
                    </Form.Control></td>
                </React.Fragment> : <React.Fragment>
                    <td><Form.Control id={"group-filter-"+this.props.id} as="select" value={this.props.filters[this.props.id].group} onChange={this.handleChange}>
                        {this.getGroups(this.props.filters[this.props.id].table)}
                    </Form.Control></td>
                </React.Fragment> }
                { this.props.req ? null : <td>
                    <button onClick={() => {
                        this.props.delete(this.props.id);
                        this.props.validateGroups();
                    }}>
                        Delete
                    </button>
                </td> }
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
    addGroup: (table, myRef) => dispatch({
        type: "add_group",
        payload: {
            type: "filters",
            table: table,
            ref: myRef
        }
    }),
    validateGroups: () => dispatch({
        type: "validate_groups",
        payload: null
    }),
    delete: (myRef) => dispatch({
        type: "delete_item",
        payload: {
            type: "filters",
            ref: myRef
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FILTER_Item);
