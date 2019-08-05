import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./App.css";

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
    render() {
        return (
        <ReduxProvider store={reduxStore}>
        <div className="App">
        <Container>
            <Row> <h6>&nbsp;</h6> </Row>
            <Row>
                <h1>[s]Cube Report SQL Builder</h1>
            </Row>
            <hr/>
            HELLO
            <hr/>
        </Container>
        </div>
        </ReduxProvider>
        );
    }
}

export default App;
