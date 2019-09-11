import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import "./Container.css";

import Form from "react-bootstrap/Form";

import accela_schema from "./accela_schema.js";
let schema = accela_schema.accela_data;

class PARAM_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newItem = _.cloneDeep(this.props.parameters[this.props.id]);
        let type = event.target.id.split("-")[0];

        if (type === "group") {
            if (event.target.value) {
                this.props.add2Group(event.target.value, this.props.id);
            }
        }
        console.log(type);
        newItem[type] = event.target.value;
        this.props.update(this.props.id, newItem);
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
        keys = [""].concat(keys);
        keys = keys.map(k => {
            return <option label={k} value={k} key={k}/>
        });
        return keys;
    }

    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td><Form.Control id={"table-param-"+this.props.id} as="select" onChange={this.handleChange}>
                    {this.getAccelaTables()}
                </Form.Control></td>
                <td><Form.Control id={"field-param-"+this.props.id} as="select" onChange={this.handleChange}>
                    {this.getAccelaFields(this.props.parameters[this.props.id].table)}
                </Form.Control></td>
                <td><Form.Control id={"comparison-param-"+this.props.id} as="select" value={this.props.parameters[this.props.id].comparison} onChange={this.handleChange}>
                    <option label="" value=""/>
                    <option label="Equal To" value="=="/>
                    <option label="Not Equal To" value="!="/>
                </Form.Control></td>
                <td><Form.Control id={"parameter_name-"+this.props.id} onChange={this.handleChange}/></td>
                <td><Form.Control id={"data_type-"+this.props.id} as="select" onChange={this.handleChange}>
                    <option value="" label=""/>
                    <option value="Text" label="Text"/>
                    <option value="Number" label="Number"/>
                    <option value="Date" label="Date"/>
                </Form.Control></td>
                <td><Form.Control id={"group-"+this.props.id} as="select" value={this.props.parameters[this.props.id].group} onChange={this.handleChange}>
                    {this.getGroups(this.props.parameters[this.props.id].table)}
                </Form.Control></td>
                <td>
                    <button onClick={() => {
                        this.props.delete(this.props.id);
                    }}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    parameters: state.parameters,
    groups: state.groups
});

const mapDispatchToProps = dispatch => ({
    update: (myRef, newItem) => dispatch({
        type: "update_item",
        payload: {
            type: "parameters",
            ref: myRef,
            item: newItem
        }
    }),
    add2Group: (group, myRef) => dispatch({
        type: "add_to_group",
        payload: {
            type: "parameters",
            group: group,
            ref: myRef
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Item);
