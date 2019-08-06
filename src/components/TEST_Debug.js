import React, { Component } from 'react';

import { connect } from "react-redux";

class TEST_DUMP extends Component {
    render() {
        return (
        <button onClick={lol => (this.props.dump())}>
            PRINT STORE TO CONSOLE
        </button>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    dump: item => dispatch({
        type: "dump_store",
        payload: null
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(TEST_DUMP);
