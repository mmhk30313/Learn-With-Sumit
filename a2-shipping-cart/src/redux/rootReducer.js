import { combineReducers } from "redux";
import { modalReducer } from "./modalOpen/modalReducer";
import shippingCartReducer from "./shippingCart/shippingCartReducer";

const rootReducer = combineReducers({
    shippingCartReducer: shippingCartReducer,
    modalReducer: modalReducer,
});

export default rootReducer;
