import { ADD_TO_CART, ADD_TO_STOCK, EDIT_PRODUCT_FROM_STOCK, REMOVE_FROM_CART, REMOVE_FROM_STOCK } from "./actionTypes";

const initialState = {
    products: [
        {
            id: 1,
            name: "Asus Vivobook X515MA",
            price: 35000,
            stock: 20,
            // quantity: 0,
        },
        {
            id: 2,
            name: "Dell E1916HV 18.5 Inch",
            price: 9300,
            stock: 35,
            // quantity: 0,
        },
        {
            id: 3,
            name: "Canon Eos 4000D 18MP",
            price: 36500,
            stock: 72,
            // quantity: 0,
        },
    ],
    cartProducts: [],
    total_items: 0,
    total_cost: "0",
    message: {pid: null, isShow: false, description: ''},
};

const shippingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_STOCK:
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        
        case REMOVE_FROM_STOCK:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
            };
        
        case EDIT_PRODUCT_FROM_STOCK:
            const editableProduct = action.payload;
            const editableCartProduct = state.products.find(product => product.id === action.payload.id);
            const cartProduct = state.cartProducts.find(product => product.id === action.payload.id);
            const cartProducts = state.cartProducts.map(product => {
                return product.id === action.payload.id ? {...product, ...action.payload, quantity: (editableCartProduct.stock > editableProduct.stock) ? editableProduct.stock : product.quantity} : product;
            });

            return {
                ...state,
                products: state.products.map(product => {
                    return product.id === action.payload.id ? action.payload : product;
                }),
                cartProducts: cartProducts,
                total_items: (editableCartProduct.stock > editableProduct.stock) ? (state?.total_items - cartProduct.quantity + editableProduct.stock) : state?.total_items,
                total_cost: cartProducts?.reduce((acc, cur) => acc + (cur?.price * cur?.quantity), 0).toString(),
                message: {
                    ...state.message,
                    pid: (editableCartProduct.stock > editableProduct.stock) ? action.payload.id : null,
                    isShow: (editableCartProduct.stock > editableProduct.stock) ? true : false,
                    description: (editableCartProduct.stock > editableProduct.stock) ? `out of stock.` : ``,
                }
            };

        case ADD_TO_CART:
            const isProductExistInCart_atc = state?.cartProducts?.find(product => product.id === action.payload);
            const isProductExistNotInCart_atc = state?.products?.find(product => product.id === action.payload);
            const product_atc = isProductExistInCart_atc || isProductExistNotInCart_atc;
            if(
                (isProductExistInCart_atc?.stock) < (isProductExistInCart_atc?.quantity + 1)
                &&
                (isProductExistNotInCart_atc?.stock) < (isProductExistInCart_atc?.quantity + 1) 
            ) {
                return {
                    ...state,
                    message: {
                        ...state.message,
                        pid: action.payload,
                        isShow: true,
                        description: `out of stock`,
                    }
                };
            }

            const curProduct_atc = {
                ...product_atc,
                quantity: ((product_atc?.quantity || 0) + 1),
            };

            // const curProduct_atc_price = curProduct_atc?.price;

            const curProducts_atc = isProductExistInCart_atc 
                                    ? state?.cartProducts?.map(product => product?.id === action?.payload ? curProduct_atc : product)
                                    : [...state?.cartProducts, curProduct_atc];
            
            return {
                ...state,
                cartProducts: curProducts_atc,
                total_items: (state?.total_items + 1),
                total_cost: curProducts_atc?.reduce((acc, cur) => acc + (cur?.price * cur?.quantity), 0).toString(),
                // total_cost: (parseInt(state?.total_cost) + curProduct_atc_price).toString(),
                message: {
                    ...state.message,
                    pid: null,
                    isShow: false,
                    description: '',
                },
            };

        case REMOVE_FROM_CART:
            const isProductExistInCart_rfc = state?.cartProducts?.find(product => product.id === action.payload);
            const  product_rfc = isProductExistInCart_rfc || state?.products?.find(product => product.id === action.payload);
            if(product_rfc?.quantity - 1 < 0) {
                return {
                    ...state,
                    message: {
                        ...state.message,
                        isShow: false,
                        description: '',
                    }
                };
            }

            const curProduct_rfc = {
                ...product_rfc,
                quantity: (product_rfc?.quantity - 1),
            };

            // const curProduct_rfc_price = curProduct_rfc?.price;

            const curProducts_rfc = product_rfc?.quantity - 1 === 0
                                    ? state?.cartProducts?.filter(product => product?.id !== action?.payload)
                                    : isProductExistInCart_rfc 
                                    ? state?.cartProducts?.map(product => product?.id === action?.payload ? curProduct_rfc : product)
                                    : [...state?.cartProducts, curProduct_rfc];;
            
            return {
                ...state,
                cartProducts: curProducts_rfc,
                total_items: (state?.total_items - 1),
                total_cost: curProducts_rfc?.reduce((acc, cur) => acc + (cur?.price * cur?.quantity), 0).toString(),
                // total_cost: (parseInt(state?.total_cost) - curProduct_rfc_price).toString() ,
                message: {
                    ...state.message,
                    isShow: false,
                    description: '',
                }
            };

        default:
            return state;
    }
};

export default shippingCartReducer;
