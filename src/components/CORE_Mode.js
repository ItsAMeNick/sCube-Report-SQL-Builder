import React, { Component } from 'react';
import { connect } from "react-redux";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

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
            <Row>
                <Col className="half">
                    <h3>Server Type: </h3>
                    <Form.Control id="server_type" as="select" onChange={e => this.props.updateServer(e.target.value)}>
                        <option/>
                        <option label="Oracle" value="Oracle"/>
                        <option label="SQL Server" value="SQL Server"/>
                    </Form.Control>
                </Col> <Col className="half">
                    <h3>Report Type: </h3>
                    <Form.Control id="server_type" as="select" onChange={e => this.props.updateReport(e.target.value)}>
                        <option/>
                        <option label="Crystal" value="Crystal"/>
                        <option label="SSRS" value="SQL SSRS"/>
                    </Form.Control>
                </Col>
            </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    updateServer: m => dispatch({
        type: "update_type",
        payload: {
            type: "server",
            value: m
        }
    }),
    updateReport: m => dispatch({
        type: "update_type",
        payload: {
            type: "report",
            value: m
        }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Mode);
