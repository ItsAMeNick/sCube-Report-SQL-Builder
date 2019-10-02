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

    genHeaders() {

    }

    genRows() {

    }

    getEMSECall(auth) {
        let url = "https://apis.accela.com/v4/scripts/GENERATE_REPORT_OUTPUT";
        let body = {
            "SQL_TO_RUN": "SELECT b1.B1_ALT_ID as ALT_ID , b1.B1_PER_ID1 as Record_ID , workflow.G6_STAT_DD as Issued_Date , addr.B1_hse_nbr_start as Street_Number , addr.B1_STR_DIR as Street_Direction , addr.b1_str_name as Street_Name , addr.B1_STR_SUFFIX as Street_Type , addr.B1_unit_start as Unit_Number , owners.B1_OWNER_FULL_NAME as Owner_Name , owners.B1_MAIL_ADDRESS1 as Owner_Address , owners.B1_MAIL_ADDRESS2 as Owner_Address2 , owners.B1_MAIL_CITY as Owner_City , owners.B1_MAIL_STATE as Owner_State , owners.B1_MAIL_ZIP as Owner_Zip , owners.B1_PHONE as Owner_Phone , contact.B1_FNAME as Applicant_First_Name , contact.B1_LNAME as Applicant_Last_Name , contact.B1_ADDRESS1 as Applicant_Address1 , contact.B1_ADDRESS2 as Applicant_Address2 , contact.B1_ADDRESS3 as Applicant_Address3 , contact.B1_PHONE1 as Applicant_Phone , professional.B1_CAE_FNAME as professional_First_Name , professional.B1_CAE_LNAME as professional_Last_Name , professional.B1_ADDRESS1 as professional_Address1 , professional.B1_ADDRESS2 as professionalt_Address2 , professional.B1_ADDRESS3 as professional_Address3 , professional.B1_PHONE1 as professional_Phone , workflow.sd_app_des as WorkflowStatus , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Type of Permit') as permit_type , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Building Code Use Classification')as Use_Classification , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Zoning Usage') as Zoning_Usage , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Number of Units')as Num_Units , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Number of Stories') as Number_Of_Stories , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Located in Flood Zone') as Flood_Plain_Zone , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Flood Zone')as Flood_Zone , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Site Plan') as Site_Plan , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'ZBA Variance') as ZBA_Variance , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Building Construction Classification') as Construction_Classification , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Occupant Load') as Assembly_Occupant_Load , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Zoning District') as Zoning_District , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Special Exception') as Special_Exception , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'NYS Variance Petition Number') as NYS , FN_GET_PARCEL_NBR(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3) as pacel_Number , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Conditions of Permitting') as Conditions_Of_Permitting , FN_GET_APP_SPEC_INFO(b1.SERV_PROV_CODE, b1.B1_PER_ID1, b1.B1_PER_ID2, b1.B1_PER_ID3, 'Scope of Work') as scope_Of_work , expInfo.expiration_date as Expiration_Date , workflow.SD_COMMENT as Comments FROM B1PERMIT b1 LEFT JOIN GPROCESS workflow ON b1.B1_PER_ID1 = workflow.B1_PER_ID1 AND b1.B1_PER_ID2 = workflow.B1_PER_ID2 AND b1.B1_PER_ID3 = workflow.B1_PER_ID3 and b1.serv_prov_code = workflow.serv_prov_code and workflow.sd_pro_des = 'Permit Issuance' and workflow.sd_app_des = 'Issued' left JOIN B3OWNERS owners ON b1.B1_PER_ID1 = owners.B1_PER_ID1 AND b1.B1_PER_ID2 = owners.B1_PER_ID2 AND b1.B1_PER_ID3 = owners.B1_PER_ID3 AND b1.SERV_PROV_CODE = owners.SERV_PROV_CODE left JOIN b3contra professional ON b1.B1_PER_ID1 = professional.B1_PER_ID1 AND b1.B1_PER_ID2 = professional.B1_PER_ID2 AND b1.B1_PER_ID3 = professional.B1_PER_ID3 AND b1.SERV_PROV_CODE = professional.SERV_PROV_CODE left JOIN b1_expiration expInfo ON b1.B1_PER_ID1 = expInfo.B1_PER_ID1 AND b1.B1_PER_ID2 = expInfo.B1_PER_ID2 AND b1.B1_PER_ID3 = expInfo.B1_PER_ID3 AND b1.SERV_PROV_CODE = expInfo.SERV_PROV_CODE LEFT JOIN B3CONTACT contact ON b1.B1_PER_ID1 = contact.B1_PER_ID1 AND b1.B1_PER_ID2 = contact.B1_PER_ID2 AND b1.B1_PER_ID3 = contact.B1_PER_ID3 AND b1.SERV_PROV_CODE = contact.SERV_PROV_CODE AND contact.B1_CONTACT_TYPE in ('Applicant', 'Agent', 'Owner') JOIN B3ADDRES addr ON b1.B1_PER_ID1 = addr.B1_PER_ID1 AND b1.B1_PER_ID2 = addr.B1_PER_ID2 AND b1.B1_PER_ID3 = addr.B1_PER_ID3 and b1.serv_prov_code = addr.serv_prov_code WHERE b1.SERV_PROV_CODE = 'PORTCHESTER' and b1.b1_alt_id = 'BLD-19-00046'"
        }
        let body_formatted = Object.keys(body).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
        }).join('&');

        console.log(body_formatted)

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': auth
            },
            redirect: 'follow',
            referrer: 'no-referrer',
            body: body_formatted
        }).then(response => response.text())
        .then(text => {
            console.log(text);
            let r = JSON.parse(text);
            this.setState({auth: r.access_token})
        });
    }

    // // This section is for the oracle version of the api call
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
    //
    // genHeaders() {
    //     return this.state.response.col_headers.map(col => {
    //         if (col === "") {
    //             return <th key={col}>{Object.keys(this.state.response.rows).length + " Items"}</th>;
    //         } else {
    //             return <th key={col}>{col}</th>;
    //         }
    //     })
    // }
    //
    // genRows() {
    //     let keys = Object.keys(this.state.response.rows);
    //     let rows = keys.map(r => {
    //         let row = this.state.response.rows[r];
    //         let col_num = -1;
    //         row = row.map(r => {
    //             col_num++;
    //             return <td key={row[0] + "-" + this.state.response.col_headers[col_num]}>{r}</td>;
    //         })
    //         return <tr key={r}>{row}</tr>;
    //     })
    //     return rows;
    // }

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
            <button onClick={() => (this.makeCall())}>
                Check Database
            </button>
            </div>
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
