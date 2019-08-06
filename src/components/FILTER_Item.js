import React, { Component } from 'react';
import { connect } from "react-redux";

import "./Container.css";

import Form from "react-bootstrap/Form";

class Filter_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <tr>
                <td><Form.Control as="select"><option label="Permit Information"/></Form.Control></td>
                <td><Form.Control as="select"><option label="Record ID"/></Form.Control></td>
                <td><Form.Control as="select"><option label="Equal To"/></Form.Control></td>
                <td><Form.Control></Form.Control></td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter_Container);
