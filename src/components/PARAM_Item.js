import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from "lodash";

import "./Container.css";

import Form from "react-bootstrap/Form";

class PARAM_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let newItem = _.cloneDeep(this.props.parameters[this.props.id]);
        let type = event.target.id.split("-")[0];

        newItem[type] = event.target.value;
        this.props.update(this.props.id, newItem);
    }

    render() {
        return (
            <tr>
                <td><Form.Control id={"parameter_name-"+this.props.id} onChange={this.handleChange}/></td>
                <td><Form.Control id={"data_type-"+this.props.id} as="select"><option label="Text"/></Form.Control></td>
                <td><Form.Control id={"report_param-"+this.props.id} readOnly></Form.Control></td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    parameters: state.parameters
});

const mapDispatchToProps = dispatch => ({
    update: (myRef, newItem) => dispatch({
        type: "update_item",
        payload: {
            type: "parameters",
            ref: myRef,
            item: newItem
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Item);
