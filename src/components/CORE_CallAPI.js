import React, { Component } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { connect } from "react-redux";

import Table from "react-bootstrap/Table";

class CORE_Api extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: "",
            agency: "",
            auth: "",
            response: {
                col_headers: [],
                rows: []
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        switch (event.target.id) {
            case "user": {
                this.setState({user: event.target.value});
                break;
            }
            case "pass": {
                this.setState({pass: event.target.value});
                break;
            }
            case "agency": {
                this.setState({agency: event.target.value});
                break;
            }
            default: break;
        }
    }

    makeCall() {
        if (!this.state.auth) {
            let url = "https://apis.accela.com/oauth2/token";
            let body = {
                'client_id': '637052063375465517',
                'client_secret': '826919eb4b0c4cdcbbe1e0b3d92a0623',
                'grant_type': 'password',
                'username': this.state.user,
                'password': this.state.pass,
                'scope': 'records run_emse_script',
                'agency_name': this.state.agency,
                'environment': 'supp'
            };
            let body_formatted = Object.keys(body).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
            }).join('&');

            fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                  'x-accela-appid': '637052063375465517',
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: body_formatted
            }).then(response => response.text())
            .then(text => {
                let r = JSON.parse(text);
                this.setState({auth: r.access_token});
                this.getEMSECall(r.access_token);
            });
        } else {
            console.log(this.state.auth)
            this.getEMSECall(this.state.auth);
        }
    }

    getEMSECall(auth) {
        let url = "https://apis.accela.com/v4/scripts/GENERATE_REPORT_OUTPUT";
        let body = {"SQL_TO_RUN": this.props.query.replace(/(\r\n|\n|\r)/g, " ")};
        console.log(body);

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': auth
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: JSON.stringify(body)
        }).then(response => response.text())
        .then(text => {
            console.log(text)
            let c = JSON.parse(text).result["SQL Results: "]
            if (c) {
                c = c.split('\n');
                let counter = -1;
                let r = c.map(item => {
                    counter++;
                    return [counter ? counter : ""].concat(item.split("|"));
                })
                c = r.shift();
                this.setState({response: {
                    col_headers: c,
                    rows: r
                }})
            }
        });
    }

    // // This section is for the oracle version of the api call (Local server)
    // makeCall() {
    //     //console.log(this.props.query);
    //     let url = "http://localhost/sCube/api.php?query="+this.props.query.replace(/\n/g, "%20").replace(/\s/g, "%20");
    //     fetch(url)
    //         .then(response => response.text())
    //         .then(text => {
    //             if (text !== -1) {
    //                 this.setState({response: JSON.parse(text)});
    //             }
    //         });
    // }

    genHeaders() {
        let col_num = -1;
        return this.state.response.col_headers.map(col => {
            col_num++;
            if (col === "") {
                return <th key={col_num}>{Object.keys(this.state.response.rows).length + " Items"}</th>;
            } else {
                return <th key={col_num}>{col}</th>;
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
            <div className="Container">
                <Row>
                    <Col>
                        Agency
                    </Col> <Col>
                        Username
                    </Col> <Col>
                        Password
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Control id="agency" onChange={this.handleChange}/>
                    </Col> <Col>
                        <Form.Control id="user" onChange={this.handleChange}/>
                    </Col> <Col>
                        <Form.Control id="pass" onChange={this.handleChange}/>
                    </Col>
                </Row>
                <Row> <Col>
                <button onClick={() => (this.makeCall())}>
                    Check Database
                </button>
                </Col> </Row>
            </div>
            <div className="Container">
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
