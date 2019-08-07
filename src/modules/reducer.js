import _ from "lodash";

const initialState = {
    mode: null,
    fields: {
        "1": {
            key: "1",
            table: "",
            field: "",
            report: ""
        }
    },
    filters: {
        // "1": {
        //     key: "1",
        //     req: false,
        //     table_name: "",
        //     field_name: "",
        //     comparison: "",
        //     value: ""
        // }
    },
    parameters: {
        // "1": {
        //     key: "1",
        //     parameter_name: "",
        //     data_type: "",
        //     report_var: ""
        // }
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
                        field: "",
                        report: ""
                    }
                break;
            }
            case "filter": {
                let codes = Object.keys(state.filters);
                let m = 0;
                for (let c in codes) {
                    if (isNaN(state.filters[codes[c]].key)) continue;
                    m = Math.max(m,state.filters[codes[c]].key);
                }
                m+=1;
                newState.filters[m] =
                    {
                        key: m,
                        req: false,
                        table_name: "",
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
                        parameter_name: "",
                        data_type: "",
                        report_var: ""
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

    case "add_specific_filter": {
        let newState = _.cloneDeep(state);
        newState.filters[action.payload.ref] = action.payload.item
        return newState;
    }

    default:
        return state;
    }
};

export default sCubeReducer;
