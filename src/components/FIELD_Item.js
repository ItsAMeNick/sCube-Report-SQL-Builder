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

        //Clear the field if table is changed
        if (type === "table") {
            newItem.field = "";
        }
        this.props.update(this.props.id, newItem);

        //Check the grouping
        if (type === "table") {
            if (!newItem.group) {
                //If this is not a one-off case
                if (this.isGroupable(event.target.value)) {
                    //Look for a groups for me
                    for (let g in this.props.groups) {
                        if (event.target.value === this.props.groups[g].table) {
                            newItem.group = g;
                            this.props.add2Group(g, this.props.id, "fields");
                        }
                    }
                    //If you couldnt be placed in a group then actually make one
                    if (!newItem.group) this.props.addGroup(event.target.value, this.props.id);
                } else {
                    this.props.addGroup(event.target.value, this.props.id);
                }
            } else {
                if (this.isGroupable(event.target.value)) {
                    if (this.props.groups[newItem.group].table !== event.target.value) {
                        //Look for a groups for me
                        let found_group = false;
                        for (let g in this.props.groups) {
                            if (event.target.value === this.props.groups[g].table) {
                                newItem.group = g;
                                this.props.add2Group(g, this.props.id, "fields");
                                found_group = true;
                            }
                        }
                        //If you couldnt be placed in a group then actually make one
                        if (!found_group) this.props.addGroup(event.target.value, this.props.id);
                    } else {
                        this.props.add2Group(this.props.fields[this.props.id].group, this.props.id, "fields");
                    }
                } else {
                    this.props.addGroup(event.target.value, this.props.id);
                }

            }
        }

        //Handle required Filters
        if (type === "field" || type === "table" || type === "group") {
            let table = this.props.fields[this.props.id].table;
            let field;
            if (type === "field") {
                field = event.target.value;
            } else if (type === "group") {
                field = this.props.fields[this.props.id].field;
            }

            if (table) {
                let required_fields = schema[table].required

                //First delete all the exisiting required filters
                if (required_fields) {
                    let keys = Object.keys(required_fields);
                    for (let r in keys) {
                        let filterRef = "R-" + this.props.id + "-" + keys[r];
                        if (this.props.filters[filterRef]) {
                            this.props.deleteFilter(filterRef);
                        }
                    }
                }

                if (field) {
                    //Then add required fields for this setup
                    if (required_fields) {
                        let keys = Object.keys(required_fields);
                        for (let r in keys) {
                            let filterRef = "R-" + this.props.id + "-" + keys[r];
                            let starting_value = "";
                            let required_filters = Array.from(this.props.groups[this.props.fields[this.props.id].group].filters).filter(item => {
                                return item.split("-")[0] === "R";
                            }).sort((a, b) => {
                                return a.split("-")[1] > b.split("-")[1];
                            });
                            if (required_filters.length >= 1) {
                                starting_value = this.props.filters[required_filters[0]].value;
                            }
                            let newFilter = {
                                            key: filterRef,
                                            group: this.props.fields[this.props.id].group,
                                            req: true,
                                            table: this.props.fields[this.props.id].table,
                                            field: keys[r],
                                            comparison: "==",
                                            value: starting_value
                                            };
                            //Set default comparison type for different groups
                            if (keys[r] === "ASI Field Name") {
                                newFilter.comparison = "==";
                            } else if (this.props.fields[this.props.id].table === "Contact Information") {
                                newFilter.comparison = "==";
                            } else if (this.props.fields[this.props.id].table === "Standard Choice") {
                                newFilter.comparison = "==";
                            }

                            if (!this.props.filters[filterRef]) {
                                this.props.addFilter(filterRef, newFilter);
                            } else {
                                this.props.requireFilter(filterRef, newFilter);
                            }
                            this.props.add2Group(this.props.fields[this.props.id].group, filterRef, "filters")
                        }
                    }
                }
            }
        }
        //Do this every time you update
        // This makes sure that the report name is being specified
        if (type === "field") {
            let table, field;
            table = this.props.fields[this.props.id].table;
            field = event.target.value;
            if (table && field) {
                this.props.updateReportName(this.props.id, schema[table].data[field].name);
            }
        }

        // This allows for new groups to be generated for data selection
        // This lets you have multiple sets of required filters
        if (type === "group") {
            if (event.target.value === "New") {
                this.props.addGroup(this.props.fields[this.props.id].table, this.props.id);
                //addGroup will handle moving all the requried filters
            } else if (event.target.value) {
                this.props.add2Group(parseInt(event.target.value), this.props.id, "fields");
                //Move required Filters
                for (let f in this.props.filters) {
                    let filter = this.props.filters[f].key.toString().split("-");
                    if (filter[0] === "R" && filter[1] === this.props.id.toString()) {
                        this.props.add2Group(parseInt(event.target.value), this.props.filters[f].key, "filters");
                    }
                }
            }
        }

        this.props.validateGroups();
    }

    isGroupable(table) {
        if (!table) return false;
        //These tables are one-offs and cannot share JOIN statements
        let list_of_ungroupable_tables = [
            "ASI Field",
            "Standard Choice"
        ];
        return !(list_of_ungroupable_tables.includes(table));
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
                <td>{this.props.id}</td>
                <td><Form.Control id={"table-"+this.props.id} as="select" onChange={this.handleChange}>
                    {this.getAccelaTables()}
                </Form.Control></td>
                <td><Form.Control id={"field-"+this.props.id} as="select" onChange={this.handleChange}>
                    {this.getAccelaFields(this.props.fields[this.props.id].table)}
                </Form.Control></td>
                <td><Form.Control id={"report-"+this.props.id} readOnly value={this.props.fields[this.props.id].report}></Form.Control></td>
                <td><Form.Control id={"group-field-"+this.props.id} as="select" value={this.props.fields[this.props.id].group} onChange={this.handleChange}>
                    {this.getGroups(this.props.fields[this.props.id].table)}
                </Form.Control></td>
                <td>
                    <button onClick={() => {
                        this.props.delete(this.props.id);
                        this.props.validateGroups();
                    }}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    fields: state.fields,
    filters: state.filters,
    groups: state.groups
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
            type: "filters",
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
    }),
    addGroup: (table, myRef) => dispatch({
        type: "add_group",
        payload: {
            type: "fields",
            table: table,
            ref: myRef
        }
    }),
    add2Group: (group, myRef, type) => dispatch({
        type: "add_to_group",
        payload: {
            type: type,
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
    }),
    validateGroups: () => dispatch({
        type: "validate_groups",
        payload: null
    }),
    delete: (myRef) => dispatch({
        type: "delete_item",
        payload: {
            type: "fields",
            ref: myRef
        }
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FIELD_Container);
