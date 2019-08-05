import _ from "lodash";

const initialState = {

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
