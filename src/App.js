import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./App.css";

import Upload from "./components/CORE_Upload.js";
import Mode from "./components/CORE_Mode.js";

import Filter from "./components/FILTER_Container.js";
import Field from "./components/FIELD_Container.js";
import Param from "./components/PARAM_Container.js";

import Output from "./components/CORE_Output.js";
import Debug from "./components/TEST_Debug.js";
import Api from "./components/CORE_CallAPI.js";

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
    render() {
        return (
        <ReduxProvider store={reduxStore}>
        <div className="App">
            <Row>
                <Col>
                    <h1>[s]Cube Report SQL Builder</h1>
                    <hr/>
                </Col>
            </Row>
            <Col>
                <Mode/>
            </Col>
            <hr/>
            <Col>
                <Upload/>
            </Col>
            <hr/>
            <Col>
                <Field/>
            </Col>
            <hr/>
            <Col>
                <Filter/>
            </Col>
            <hr/>
            <Col>
                <Param/>
            </Col> <Col>
                <Debug/>
            </Col> <Col>
                <Output/>
            </Col>
            <Col>
                <Api/>
            </Col>
        </div>
        </ReduxProvider>
        );
    }
}

export default App;
