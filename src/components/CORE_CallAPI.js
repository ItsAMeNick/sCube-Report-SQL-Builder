import React, { Component } from 'react';

import { connect } from "react-redux";

import Table from "react-bootstrap/Table";

class CORE_Api extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {
                col_headers: [],
                rows: []
            }
        };
    }

    makeCall() {
        //console.log(this.props.query);
        let url = "http://localhost/sCube/api.php?query="+this.props.query.replace(/\n/g, "%20").replace(/\s/g, "%20");
        fetch(url)
            .then(response => response.text())
            .then(text => {
                if (text !== -1) {
                    this.setState({response: JSON.parse(text)});
                }
            });
    }

    genHeaders() {
        return this.state.response.col_headers.map(col => {
            if (col === "") {
                return <th key={col}>{Object.keys(this.state.response.rows).length + " Items"}</th>;
            } else {
                return <th key={col}>{col}</th>;
            }
        })
    }

    genRows() {
        let keys = Object.keys(this.state.response.rows);
        let rows = keys.map(r => {
            let row = this.state.response.rows[r];
            let col_num = -1;
            row = row.map(r => {
                col_num++;
                return <td key={row[0] + "-" + this.state.response.col_headers[col_num]}>{r}</td>;
            })
            return <tr key={r}>{row}</tr>;
        })
        return rows;
    }

    render() {
        return (
        <div>
            <button onClick={() => (this.makeCall())}>
                Check Database
            </button>
            <Table bordered striped responsive>
            <thead>
                <tr>
                    {this.genHeaders()}
                </tr>
            </thead>
            <tbody>
                {this.genRows()}
            </tbody>
            </Table>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    query: state.query
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Api);
