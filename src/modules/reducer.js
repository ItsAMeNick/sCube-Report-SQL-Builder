import _ from "lodash";

const initialState = {
    report_type: null,
    server_type: null,
    groups: {
        // 1: {
        //     key: 1,
        //     table: "",
        //     fields: new Set([]),
        //     filters: new Set([]),
        //     parameters: new Set([])
        // }
    },
    fields: {
        1: {
            key: 1,
            group: "",
            table: "",
            field: "",
            report: ""
        }
    },
    filters: {
        // 1: {
        //     key: 1,
        //     group: "",
        //     req: false,
        //     table: "",
        //     field: "",
        //     comparison: "",
        //     value: ""
        // }
    },
    parameters: {
        // 1: {
        //     key: 1,
        //     group: "",
        //     parameter_name: "",
        //     data_type: "",
        //     table: "",
        //     field: "",
        //     comparison: ""
        // }
    },
    loaded_data: {
        svp: null,
        caps: null,
        asis: null,
        fees: null,
        notes: null,
        inspections: null,
        inspection_results: null,
        contact_types: null,
        lp_types: null,
        doc_types: null,
        workflows: null,
        checklists: null,
        std_choices: null
    },
    query: null
};

const sCubeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "dump_store": {
            console.log(state);
            return state;
        }

        case "update_type": {
            let newState = _.cloneDeep(state);
            if (action.payload.type === "report") {
                newState.report_type = action.payload.value;
            } else if (action.payload.type === "server") {
                newState.server_type = action.payload.value;
            }
            return newState;
        }

        case "update_report_name": {
            let newState = _.cloneDeep(state);
            switch (newState.fields[action.payload.ref].table) {
                case "ASI Field": {
                    let name_string = "ASI_" + action.payload.base.replace(/\W/g, '_');
                    newState.fields[action.payload.ref].report = name_string.substring(0,25);
                    break;
                }
                default: {
                    for (let f in newState.fields) {
                        if (Object.keys(newState.fields).length === 1) {
                            newState.fields[action.payload.ref].report = action.payload.base;
                            continue;
                        }
                        if (f === action.payload.ref) continue;
                        if ((newState.fields[f].field === newState.fields[action.payload.ref].field) && (newState.fields[f].table === newState.fields[action.payload.ref].table)) {
                            newState.fields[action.payload.ref].report = action.payload.base + "_" + newState.fields[action.payload.ref].group;
                        } else {
                            newState.fields[action.payload.ref].report = action.payload.base;
                        }
                    }
                    break;
                }
            }
            return newState;
        }

        case "add_group": {
            let newState = _.cloneDeep(state);
            let codes = Object.keys(state.groups);
            let m = 0;
            for (let c in codes) {
                m = Math.max(m,state.groups[codes[c]].key);
            }
            m+=1;
            newState.groups[m] =
                {
                    key: m,
                    table: action.payload.table,
                    fields: new Set([]),
                    filters: new Set([]),
                    parameters: new Set([])
                }
            //Add my creator
            newState.groups[m][action.payload.type].add(action.payload.ref);
            //Update my creator
            newState[action.payload.type][action.payload.ref].group = m;
            return newState;
        }

        case "add_to_group": {
            let newState = _.cloneDeep(state);
            newState.groups[action.payload.group][action.payload.type].add(action.payload.ref);
            newState[action.payload.type][action.payload.ref].group = action.payload.group;
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
                    let g = null;
                    if (newState.fields[m-1]) g = newState.fields[m-1].group;
                    newState.fields[m] =
                        {
                            key: m,
                            group: g,
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
                            group: "",
                            req: false,
                            table: "",
                            field: "",
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
                            group: "",
                            parameter_name: "",
                            data_type: "",
                            table: "",
                            field: "",
                            comparison: ""
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
            //First ungroup the item (if necessary)
            let oldGroup = newState[action.payload.type][action.payload.ref].group;
            newState.groups[oldGroup][action.payload.type].delete([action.payload.ref].toString());

            //Then delete the item
            delete newState[action.payload.type][action.payload.ref];
            return newState;
        }

        case "add_specific_filter": {
            let newState = _.cloneDeep(state);
            newState.filters[action.payload.ref] = action.payload.item
            return newState;
        }

        //Below is related to file uploads
        case "load_file_data": {
            let newState = _.cloneDeep(state);
            newState.loaded_data[action.payload.type] = action.payload.data
            return newState;
        }

        //This function will be used to "validate" groups
        //it should be run whenever something the affects groups is enacted
        case "validate_groups": {
            let newState = _.cloneDeep(state);
            for (let g in newState.groups) {
                let fields = Array.from(newState.groups[g].fields);
                let filters = Array.from(newState.groups[g].filters);
                let parameters = Array.from(newState.groups[g].parameters);

                for (let f in fields) {
                    if (newState.fields[fields[f]] && parseInt(newState.fields[fields[f]].group) !== newState.groups[g].key) {
                        newState.groups[g].fields.delete(fields[f])
                    }
                }

                for (let f in filters) {
                    console.log(filters);
                    if (filters[f][0] === "R") {
                        console.log("Required Filter: ", filters[f])
                        let corresponding_field = filters[f].split("-")[1];
                        if (newState.fields[corresponding_field] && parseInt(newState.fields[corresponding_field].group) === newState.groups[g].key) {
                            //console.log("GOOD");
                        } else {
                            //console.log("BAD");
                            newState.groups[g].filters.delete(filters[f]);
                        }
                    } else {
                        if (newState.filters[filters[f]] && parseInt(newState.filters[filters[f]].group) !== newState.groups[g].key) {
                            newState.groups[g].filters.delete(filters[f]);
                        }
                    }
                }

                if (!newState.groups[g].fields.size && !newState.groups[g].filters.size && !newState.groups[g].parameters.size) {
                    console.log('Deleting', newState.groups[g]);
                    delete newState.groups[g];
                }
            }
            return newState;
        }

        case "set_query": {
            let newState = _.cloneDeep(state);
            newState.query = action.payload;
            return newState;
        }

        default: return state;
    }
};

export default sCubeReducer;
