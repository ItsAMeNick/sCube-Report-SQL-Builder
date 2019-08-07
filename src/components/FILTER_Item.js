import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import "./Container.css";

import Form from "react-bootstrap/Form";

import accela_schema from "./accela_schema.js";
let schema = accela_schema.accela_data;

class Filter_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newItem = _.cloneDeep(this.props.filters[this.props.id]);
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
                { this.props.req ? <React.Fragment>
                    <td>{this.props.id.split("-")[0] + "-" + this.props.id.split("-")[1]}</td>
                    <td>
                        <Form.Control id={"table_name-"+this.props.id} value={this.props.filters[this.props.id].table_name} readOnly onChange={this.handleChange}/>
                    </td>
                    <td>
                        <Form.Control id={"field_name-"+this.props.id} value={this.props.filters[this.props.id].field_name} readOnly onChange={this.handleChange}/>
                    </td>
                </React.Fragment> : <React.Fragment>
                    <td>{this.props.id}</td>
                    <td><Form.Control id={"table_name-"+this.props.id} as="select" onChange={this.handleChange}>
                        {this.getAccelaTables()}
                    </Form.Control></td>
                    <td><Form.Control id={"field_name-"+this.props.id} as="select" onChange={this.handleChange}>
                        {this.getAccelaFields(this.props.filters[this.props.id].table_name)}
                    </Form.Control></td>
                </React.Fragment> }
                <td><Form.Control id={"comparison-"+this.props.id} as="select" onChange={this.handleChange}>
                    <option label="" value=""/>
                    <option label="Equal To" value="=="/>
                    <option label="Not Equal To" value="!="/>
                </Form.Control></td>
                <td><Form.Control id={"value-"+this.props.id} onChange={this.handleChange}/></td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    filters: state.filters
});

const mapDispatchToProps = dispatch => ({
    update: (myRef, newItem) => dispatch({
        type: "update_item",
        payload: {
            type: "filters",
            ref: myRef,
            item: newItem
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter_Container);
