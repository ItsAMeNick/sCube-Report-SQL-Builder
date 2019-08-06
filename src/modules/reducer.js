import _ from "lodash";

const initialState = {
    mode: null,
    sources: {
        "1": {
            key: 1,
            name: null,
            table: null,
            table_name: null,
            parent: null,
            conditions: {
                "1": {
                    key: 1,
                    field: null,
                    type: null,
                    value: null
                }
            },
            fields: {
                "1": {
                    key: 1,
                    value: null,
                    reference: null,
                }
            }
        }
    },
    parameters: {
        "1": {
            key: 1,
            name: null,
            type: null
        }
    }
};

const sCubeReducer = (state = initialState, action) => {
    switch (action.type) {
    case "dump_store": {
        console.log(state);
        return state;
    }

    case "update_item": {
        let newState = _.cloneDeep(state);
        newState.mode = action.payload.mode;
        return newState;
    }

    default:
        return state;
    }
};

export default sCubeReducer;
