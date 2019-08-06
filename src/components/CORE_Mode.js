import React, { Component } from 'react';
import { connect } from "react-redux";

import "./Container.css";

import Form from "react-bootstrap/Form"

class CORE_Mode extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Container">
                <h3>Report Type: </h3>
                <Form.Control as="select" onChange={e => this.props.update(e.target.value)}>
                    <option/>
                    <option label="Oracle" value="Oracle"/>
                    <option label="SQL Server" value="SQL Server"/>
                </Form.Control>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    update: m => dispatch({
        type: "update_type",
        payload: m
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Mode);
