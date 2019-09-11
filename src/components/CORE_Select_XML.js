import React, { Component } from 'react';
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";

class CORE_XML extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                Filter Dropdows
                <Form.Control as="select" multiple onChange={this.handleMulti}>
                    <option label="Item1"/>
                    <option label="Item2"/>
                    <option label="Item3"/>
                    <option label="Item4"/>
                </Form.Control>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_XML);
