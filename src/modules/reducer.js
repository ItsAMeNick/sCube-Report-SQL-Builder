import _ from "lodash";

const initialState = {
    mode: null,
    fields: {
        "1": {
            key: 1,
            table: "",
            field_name: "",
            report_name: ""
        }
    },
    filters: {
        "1": {
            key: 1,
            table: "",
            field_name: "",
            comparison: "",
            value: ""
        }
    },
    parameters: {
        "1": {
            key: 1,
            name: "",
            type: "",
            ref: ""
        }
    }
};

const sCubeReducer = (state = initialState, action) => {
    switch (action.type) {
    case "dump_store": {
        console.log(state);
        return state;
    }

    case "update_type": {
        let newState = _.cloneDeep(state);
        newState.mode = action.payload;
        return newState;
    }

    case "add_item": {
        let newState = _.cloneDeep(state);
        switch (action.payload.type) {
            case "field": {
                let codes = Object.keys(state.fields);
                let m = 0;
                for (let c in codes) {
                    m = Math.max(m,state.fields[codes[c]].key);
                }
                m+=1;
                newState.fields[m] =
                    {
                        key: m,
                        table: "",
                        field_name: "",
                        report_name: ""
                    }
                break;
            }
            case "filter": {
                let codes = Object.keys(state.filters);
                let m = 0;
                for (let c in codes) {
                    m = Math.max(m,state.filters[codes[c]].key);
                }
                m+=1;
                newState.filters[m] =
                    {
                        key: m,
                        table: "",
                        field_name: "",
                        comparison: "",
                        value: ""
                    }
                break;
            }
            case "parameter": {
                let codes = Object.keys(state.parameters);
                let m = 0;
                for (let c in codes) {
                    m = Math.max(m,state.parameters[codes[c]].key);
                }
                m+=1;
                newState.parameters[m] =
                    {
                        key: m,
                        name: "",
                        type: "",
                        ref: ""
                    }
                break;
            }
            default: break;
        }
        return newState;
    }
    case "update_item": {
        let newState = _.cloneDeep(state);
        newState[action.payload.type][action.payload.ref] = action.payload.item;
        return newState;
    }
    case "delete_item": {
        let newState = _.cloneDeep(state);
        delete newState[action.payload.type][action.payload.ref];
        return newState;
    }

    default:
        return state;
    }
};

export default sCubeReducer;
