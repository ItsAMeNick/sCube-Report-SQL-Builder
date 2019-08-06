import React, { Component } from 'react';
import { connect } from "react-redux";

import "./Container.css";

import Form from "react-bootstrap/Form";

class PARAM_Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <tr>
                <td><Form.Control/></td>
                <td><Form.Control as="select"><option label="Text"/></Form.Control></td>
                <td><Form.Control readOnly></Form.Control></td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    parameters: state.parameters
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PARAM_Item);
