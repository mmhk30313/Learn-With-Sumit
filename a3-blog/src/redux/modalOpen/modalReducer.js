import { OPEN_MODAL, CLOSE_MODAL } from "./actionType";

const initialState = {
    isOpen: false,
    blog: null,
};

const modalReducer = (state = {...initialState}, action) => {
    // console.log({action});
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                blog: action?.payload,
            };
        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                blog: null,
            };
        default:
            return state;
    }
}

export default modalReducer;