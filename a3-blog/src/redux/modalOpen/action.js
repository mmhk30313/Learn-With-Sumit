import { CLOSE_MODAL, OPEN_MODAL } from "./actionType";

export const openModal = (blog = null) => { 
    // console.log({blog});
    return {
        type: OPEN_MODAL,
        payload: blog,
    }
};

export const closeModal = () => ({
    type: CLOSE_MODAL,
});