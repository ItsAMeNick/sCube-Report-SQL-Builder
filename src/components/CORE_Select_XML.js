import React, { Component } from 'react';
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";

class CORE_XML extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    genOptions() {
        console.log("Doing options")
        if (!this.props.record_types) return null;
        let record_types = this.props.record_types.map(cap => {
            let record = [cap.module, cap.type, cap.subtype, cap.category].join("/");
            return <option key={cap.key} value={record} label={record}/>
        })
        return record_types;
    }

    handleMulti(event) {
        let selected;
        selected = [...event.target.options].filter(o => {
            return o.selected;
        }).map(o => {
            return o.label;
        })
        this.props.update(selected);
    }

    render() {
        return (
            <div>
                <Form.Label>
                    Filter Dropdowns
                </Form.Label>
                <Form.Control as="select" multiple onChange={(e) => this.handleMulti(e)}>
                    {this.genOptions()}
                </Form.Control>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    record_types: state.loaded_data.caps,
    active_records: state.active_records
});

const mapDispatchToProps = dispatch => ({
    update: (records) => dispatch({
        type: "active_records",
        payload: records
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_XML);
