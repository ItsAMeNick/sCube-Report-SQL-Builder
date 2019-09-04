import React, { Component } from 'react';

import { connect } from "react-redux";

class CORE_Api extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    makeCall() {
        //console.log(this.props.query);
        let url = "http://localhost/sCube/api.php?query="+this.props.query.replace(/\n/g, "%20").replace(/\s/g, "%20");
        console.log(url);
        fetch(url)
            .then(response => response.text())
            .then(t => {
                document.getElementById("response_table").innerHTML = t;
            });
    }


    render() {
        return (
        <div>
            <button onClick={() => (this.makeCall())}>
                Check Database
            </button>
            <div id="response_table"/>
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
