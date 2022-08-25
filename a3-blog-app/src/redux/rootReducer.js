import { combineReducers } from "redux";
import filterReducer from "./filters/reducer";
import modalReducer from "./modalOpen/modalReducer";

const rootReducer = combineReducers({
    filterState: filterReducer,
    modalState: modalReducer,

});

export default rootReducer;
