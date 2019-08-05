import _ from "lodash";

const initialState = {

};

const sCubeReducer = (state = initialState, action) => {
    switch (action.type) {
    case "dump_store": {
        console.log(state);
        return state;
    }

    default:
        return state;
    }
};

export default sCubeReducer;
