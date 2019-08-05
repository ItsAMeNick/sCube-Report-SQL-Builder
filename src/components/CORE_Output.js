import React, { Component } from 'react';
import { connect } from "react-redux";

var sql_text = "";

class CORE_Output extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    generateSQL() {
        sql_text += "SELECT * FROM B1PERMIT";
        return sql_text;
    }

    render() {
        return (
        <div>
            <hr/>
            <textarea rows="20" style={{width: "100%"}} value={this.generateSQL()} readOnly={true} />
        </div>
        );
    }
}

const mapStateToProps = state => ({
    state: state
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CORE_Output);
