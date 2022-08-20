import { CLOSE_MODAL, OPEN_MODAL } from "./actionType";

export const openModal = (product = null) => ({
    type: OPEN_MODAL,
    payload: product,
});

export const closeModal = () => ({
    type: CLOSE_MODAL,
});