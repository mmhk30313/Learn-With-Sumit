import { ADD_TO_CART, REMOVE_FROM_CART, ADD_TO_STOCK, REMOVE_FROM_STOCK, EDIT_PRODUCT_FROM_STOCK } from "./actionTypes";

export const addProductToCart = (id) => {
    return {
        type: ADD_TO_CART,
        payload: id,
    };
};

export const removeProductFromCart = (id) => {
    return {
        type: REMOVE_FROM_CART,
        payload: id,
    };
};

export const addProductToStock = (product) => {
    return {
        type: ADD_TO_STOCK,
        payload: product,
    };
}

export const editProductFromStock = (product) => {
    return {
        type: EDIT_PRODUCT_FROM_STOCK,
        payload: product,
    };
}

export const removeProductFromStock = (id) => {
    return {
        type: REMOVE_FROM_STOCK,
        payload: id,
    };
}
