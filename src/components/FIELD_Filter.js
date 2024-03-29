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

        //9/11/2019: I think this is deprecieted, will keep my eye on it
        if (type === "group") {
            if (event.target.value) {
                this.props.add2Group(event.target.value, this.props.id);
            }
        }

        //Update myself, but also update anyone in my groups
        newItem[type] = event.target.value;
        this.props.update(this.props.id, newItem);

        let group_members = Array.from(this.props.groups[this.props.filters[this.props.id].group].filters);
        for (let g in group_members) {
            if (group_members[g].split("-")[2] === newItem.key.split("-")[2]) {
                let newFriend = _.cloneDeep(this.props.filters[group_members[g]]);
                newFriend[type] = event.target.value;
                this.props.update(group_members[g], newFriend);
            }
        }

        if (type === "value") {
            if (this.props.filters[this.props.id].field === "Contact Type") {
                this.props.updateReportName(this.props.id.split("-")[1], this.props.fields[this.props.id.split("-")[1]].field);
            } else {
                this.props.updateReportName(this.props.id.split("-")[1], event.target.value);
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

    genRow() {
        switch(this.props.filters[this.props.id].field) {
            case "ASI Field Name": {
                return (
                    <tr style={{"backgroundColor": "#C6DEFF"}}>
                        <td>{this.props.id.split("-")[0] + "\u2011" + this.props.id.split("-")[1]}</td>
                        <td>
                            <Form.Control id={"field-name-"+this.props.id} value={this.props.filters[this.props.id].field} readOnly onChange={this.handleChange}/>
                        </td>
                        <td><Form.Control id={"comparison-"+this.props.id} as="select" value={this.props.filters[this.props.id].comparison} readOnly onChange={this.handleChange}>
                            <option label="Equal To" value="=="/>
                        </Form.Control></td>
                        {this.props.loaded_asis ?
                            <td><Form.Control id={"value-"+this.props.id} as="select" value={this.props.filters[this.props.id].value} placeholder="Name of Field" onChange={this.handleChange}>
                                {this.loadASIsFromData()}
                            </Form.Control></td>
                        :
                            <td><Form.Control id={"value-"+this.props.id} value={this.props.filters[this.props.id].value} placeholder="Name of Field" onChange={this.handleChange}/></td>
                        }
                    </tr>
                )
            }
            case "Fee Item": {
                return (
                    <tr style={{"backgroundColor": "#C6DEFF"}}>
                        <td>{this.props.id.split("-")[0] + "\u2011" + this.props.id.split("-")[1]}</td>
                        <td>
                            <Form.Control id={"field-name-"+this.props.id} value={this.props.filters[this.props.id].field} readOnly onChange={this.handleChange}/>
                        </td>
                        <td><Form.Control id={"comparison-"+this.props.id} as="select" value={this.props.filters[this.props.id].comparison} readOnly onChange={this.handleChange}>
                            <option label="Equal To" value="=="/>
                        </Form.Control></td>
                        {this.props.loaded_fees ?
                            <td><Form.Control id={"value-"+this.props.id} as="select" value={this.props.filters[this.props.id].value} placeholder="Name of Field" onChange={this.handleChange}>
                                {this.loadFeesFromData()}
                            </Form.Control></td>
                        :
                            <td><Form.Control id={"value-"+this.props.id} value={this.props.filters[this.props.id].value} placeholder="Name of Field" onChange={this.handleChange}/></td>
                        }
                    </tr>
                )
            }
            case "Contact Type": {
                return (
                    <tr style={{"backgroundColor": "#C6DEFF"}}>
                        <td>{this.props.id.split("-")[0] + "\u2011" + this.props.id.split("-")[1]}</td>
                        <td>
                            <Form.Control id={"field-name-"+this.props.id} value={this.props.filters[this.props.id].field} readOnly onChange={this.handleChange}/>
                        </td>
                        <td><Form.Control id={"comparison-"+this.props.id} as="select" value={this.props.filters[this.props.id].comparison} readOnly onChange={this.handleChange}>
                            <option label="Equal To" value="=="/>
                        </Form.Control></td>
                        {this.props.loaded_contacts ?
                            <td><Form.Control id={"value-"+this.props.id} as="select" value={this.props.filters[this.props.id].value} placeholder="Name of Field" onChange={this.handleChange}>
                                {this.loadContactsFromData()}
                            </Form.Control></td>
                        :
                            <td><Form.Control id={"value-"+this.props.id} value={this.props.filters[this.props.id].value} placeholder="Name of Field" onChange={this.handleChange}/></td>
                        }
                    </tr>
                )
            }
            case "STDC Group": {
                return (
                    <tr style={{"backgroundColor": "#C6DEFF"}}>
                        <td>{this.props.id.split("-")[0] + "\u2011" + this.props.id.split("-")[1]}</td>
                        <td>
                            <Form.Control id={"field-name-"+this.props.id} value={this.props.filters[this.props.id].field} readOnly onChange={this.handleChange}/>
                        </td>
                        <td><Form.Control id={"comparison-"+this.props.id} as="select" value={this.props.filters[this.props.id].comparison} readOnly onChange={this.handleChange}>
                            <option label="Equal To" value="=="/>
                        </Form.Control></td>
                        {this.props.loaded_std ?
                            <td><Form.Control id={"value-"+this.props.id} as="select" value={this.props.filters[this.props.id].value} placeholder="Name of Field" onChange={this.handleChange}>
                                {this.loadSTDGroup()}
                            </Form.Control></td>
                        :
                            <td><Form.Control id={"value-"+this.props.id} value={this.props.filters[this.props.id].value} placeholder="Name of Field" onChange={this.handleChange}/></td>
                        }
                    </tr>
                )
            }
            case "STDC Field": {
                return (
                    <tr style={{"backgroundColor": "#C6DEFF"}}>
                        <td>{this.props.id.split("-")[0] + "\u2011" + this.props.id.split("-")[1]}</td>
                        <td>
                            <Form.Control id={"field-name-"+this.props.id} value={this.props.filters[this.props.id].field} readOnly onChange={this.handleChange}/>
                        </td>
                        <td><Form.Control id={"comparison-"+this.props.id} as="select" value={this.props.filters[this.props.id].comparison} readOnly onChange={this.handleChange}>
                            <option label="Equal To" value="=="/>
                        </Form.Control></td>
                        {this.props.loaded_std ?
                            <td><Form.Control id={"value-"+this.props.id} as="select" value={this.props.filters[this.props.id].value} placeholder="Name of Field" onChange={this.handleChange}>
                                {this.loadSTDChoice()}
                            </Form.Control></td>
                        :
                            <td><Form.Control id={"value-"+this.props.id} value={this.props.filters[this.props.id].value} placeholder="Name of Field" onChange={this.handleChange}/></td>
                        }
                    </tr>
                )
            }
            default: {
                return (
                    <tr style={{"backgroundColor": "#C6DEFF"}}>
                        <td>{this.props.id.split("-")[0] + "\u2011" + this.props.id.split("-")[1]}</td>
                        <td>
                            <Form.Control id={"field-name-"+this.props.id} value={this.props.filters[this.props.id].field} readOnly onChange={this.handleChange}/>
                        </td>
                        <td><Form.Control id={"comparison-"+this.props.id} as="select" value={this.props.filters[this.props.id].comparison} readOnly onChange={this.handleChange}>
                            <option label="Equal To" value="=="/>
                        </Form.Control></td>
                        <td><Form.Control id={"value-"+this.props.id} value={this.props.filters[this.props.id].value} placeholder="Name of Field" onChange={this.handleChange}/></td>
                    </tr>
                )
            }
        }
    }

    loadASIsFromData() {
        let active_records = this.props.loaded_caps.filter(cap => {
            if (!this.props.active_records) return true;
            return this.props.active_records.includes(cap.key.toString());
        }).map(cap => {
            return cap.asi_code;
        });
        return [<option key={-1}/>].concat(this.props.loaded_asis.filter(item => {
            return item.group === "APPLICATION";
        }).filter(item => {
            return active_records.includes(item.code);
        }).sort((item1, item2) => {
            if (item1.code.localeCompare(item2.code) === 0) {
                if (item1.type.localeCompare(item2.type) === 0) {
                    return item1.name.localeCompare(item2.name);
                } else {
                    return item1.type.localeCompare(item2.type)
                }
            } else {
                return item1.code.localeCompare(item2.code);
            }
        }).map(item => {
            return <option key={item.key} label={item.alias ? item.code+" - "+item.type+" - "+item.alias : item.code+" - "+item.type+" - "+item.name} value={item.name}/>
        }));
    }

    loadFeesFromData() {
        let active_records = this.props.loaded_caps.filter(cap => {
            if (!this.props.active_records) return true;
            return this.props.active_records.includes(cap.key.toString());
        }).map(cap => {
            return cap.fee_code;
        });
        let codes = [<option key={-1}/>]
        let used_codes = [];
        codes = codes.concat(this.props.loaded_fees.filter(item => {
            if (used_codes.includes(item.code)) {
                return false;
            } else {
                used_codes.push(item.code);
                return true;
            }
        }).filter(item => {
            return active_records.includes(item.schedule)
        }).sort((item1, item2) => {
            return item1.code.localeCompare(item2.code);
        }).map(item => {
            return <option key={item.key} label={item.code+" - "+item.desc} value={item.code}/>
        }));
        return codes;
    }

    loadContactsFromData() {
        return [<option key={-1}/>].concat(this.props.loaded_contacts
            .sort((item1, item2) => {
                return item1.value.localeCompare(item2.value);
            }).map(item => {
                return <option key={item.key} label={item.value} value={item.value}/>
            }));
    }

    loadSTDGroup() {
        return [<option key={-1}/>].concat(this.props.loaded_std
            // .sort((item1, item2) => {
            //     return item1.value.localeCompare(item2.value);
            // })
            .map(item => {
                return <option key={item.key} label={item.name} value={item.name}/>
            }));
    }

    loadSTDChoice() {
        return [<option key={-1}/>].concat(this.props.loaded_std
            // .sort((item1, item2) => {
            //     return item1.value.localeCompare(item2.value);
            // })
            .map(item => {
                return <option key={item.key} label={item.value} value={item.value}/>
            }));
    }

render() {
    return (
        this.genRow()
    );
}
}

const mapStateToProps = state => ({
    fields: state.fields,
    filters: state.filters,
    groups: state.groups,
    loaded_caps: state.loaded_data.caps,
    loaded_asis: state.loaded_data.asis,
    loaded_fees: state.loaded_data.fees,
    loaded_contacts: state.loaded_data.contact_types,
    loaded_std: state.loaded_data.std_choices,
    active_records: state.active_records,
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
