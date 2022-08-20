import { OPEN_MODAL, CLOSE_MODAL } from "./actionType";

const initialState = {
    isOpen: false,
    product: null,
};

export const modalReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                isOpen: true,
                product: action?.payload,
            };
        case CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                product: null,
            };
        default:
            return state;
    }
}