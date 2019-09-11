import React, { Component } from 'react';
import { connect } from "react-redux";

import "./Container.css";

import FieldItem from "./FIELD_Item.js";
import Filter from "./FIELD_Filter.js";
import Table from "react-bootstrap/Table";

class FIELD_Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateRows() {
        let rows = [];
        for (let i in this.props.fields) {
            rows.push(
                <FieldItem key={i} id={i}/>
            );

            // //Code to add all requried Filters
            // for (let f in this.props.filters) {
            //     if (typeof this.props.filters[f].key !== "string") continue;
            //     let filter_id = this.props.filters[f].key.split("-");
            //     if (filter_id[1] === i) {
            //         rows.push(<Filter key={this.props.filters[f].key} id={this.props.filters[f].key} req={true}/>)
            //     }
            // }

            //Add Required Filters (Only from min row in each group);
            let min_from_groups = {};
            for (let f in this.props.filters) {
                if (typeof this.props.filters[f].key !== "string") continue;
                let filter_id = parseInt(this.props.filters[f].key.split("-")[1]);
                if (min_from_groups[this.props.filters[f].group]) {
                    min_from_groups[this.props.filters[f].group] = Math.min(min_from_groups[this.props.filters[f].group], filter_id);
                } else {
                    min_from_groups[this.props.filters[f].group] = filter_id;
                }
            }

            console.log(min_from_groups);

            for (let f in this.props.filters) {
                if (typeof this.props.filters[f].key !== "string") continue;
                let filter_id = this.props.filters[f].key.split("-")[1];
                if (filter_id.toString() === i && filter_id === min_from_groups[this.props.filters[f].group].toString()) {
                    rows.push(<Filter key={this.props.filters[f].key} id={this.props.filters[f].key} req={true}/>)
                }
            }
            // let min = -1;
            // for (let f in this.props.filters) {
            //     if (typeof this.props.filters[f].key !== "string") continue;
            //     let filter_id = this.props.filters[f].key.split("-");
            //     if (this.props.fields[i].group === ) {
            //         if (min === -1) min = filter_id[1];
            //         else min = Math.min(min, filter_id[1]);
            //     }
            // }
            // for (let f in this.props.filters) {
            //     if (typeof this.props.filters[f].key !== "string") continue;
            //     let filter_id = this.props.filters[f].key.split("-");
            //     if (filter_id[1].toString() === min.toString() && filter_id[1] === i) {
            //         rows.push(<Filter key={this.props.filters[f].key} id={this.props.filters[f].key} req={true}/>)
            //     }
            // }
        }
        return (
            rows
        );
    }

    render() {
        return (
            <div className="Container">
                <h3>Data Selection (FIELD)</h3>
                <Table bordered striped responsive>
                <thead>
                    <tr>
                        <td>#</td>
                        <th>Table</th>
                        <th>Field</th>
                        <th>Report Variable Name</th>
                        <th>Grouping (WIP)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateRows()}
                </tbody>
                </Table>
                <button onClick={this.props.add}>Add Item</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    fields: state.fields,
    filters: state.filters,
    groups: state.groups
});

const mapDispatchToProps = dispatch => ({
    add: () => dispatch({
        type: "add_item",
        payload: {type: "field"}
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FIELD_Container);
