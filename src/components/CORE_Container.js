import React, { Component } from 'react';
import { connect } from "react-redux";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

class CORE_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <Table bordered striped>
        <thead>
            <tr>
                <th>Table</th>
                <th>Data Point</th>
                <th>Report Variable Name</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><Form.Control as="select"><option/></Form.Control></td>
                <td><Form.Control as="select"><option/></Form.Control></td>
                <td><Form.Control as="select"><option/></Form.Control></td>
            </tr>
        </tbody>
        </Table>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Container);
