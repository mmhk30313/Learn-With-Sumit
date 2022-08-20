import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/modalOpen/action";
import { addProductToCart, removeProductFromStock } from "../redux/shippingCart/actions";
import OrderDetails from "./OrderDetails";
import OurModal from "./shared/OurModal";

const ShippingCart = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const { products, cartProducts } = state?.shippingCartReducer;

    const handleAddToCart = (id) => {
        dispatch(addProductToCart(id));
    }

    const handleDeleteProduct = (id) => {
        dispatch(removeProductFromStock(id));
    }
    

    const handleOpenModal = (product = null) => {
        dispatch(openModal(product));
    }
    // console.log(products);
    return(
        <React.Fragment>
            <div className="bg-gray-50 h-full md:h-screen">
                <div className="grid place-items-center">
                    <h1
                        className="text-gray-900 font-bold text-3xl p-10 underline decoration-purple-500 decoration-4 underline-offset-8 mb-4"
                    >
                        Shopping Cart
                    </h1>
                </div>
                <div className="grid grid-cols-12 gap-6">
                    <div
                        className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 xxl:col-span-8"
                    >
                        <button
                            className="mx-4 bg-purple-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => handleOpenModal()}
                        >
                            ADD PRODUCT
                        </button>
                        {
                            products?.map(product => (
                                <div key={product?.id} className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-4">
                                    <div className="flex justify-between px-4 items-center">
                                        <div className="text-lg font-semibold">
                                            <p>{product?.name} ({product?.stock})</p>
                                            <p className="text-gray-400 text-base">Tk {product?.price}</p>
                                        </div>
                                        <div className="lg:flex lg:flex-row sm:flex sm:flex-col sm:text-center sm:gap-2">
                                            <div className="text-lg font-semibold text-center">
                                                <button
                                                    className="focus:outline-none bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center"
                                                    onClick={() => handleDeleteProduct(product?.id)}
                                                    disabled={cartProducts?.find(cartProduct => cartProduct?.id === product?.id)}
                                                    style={{ cursor: cartProducts?.find(cartProduct => cartProduct?.id === product?.id) ? "not-allowed" : "pointer" }}
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        width="24" height="24" 
                                                        fill="currentColor" 
                                                        className="bi bi-archive p-1" 
                                                        viewBox="0 0 16 16"
                                                    > 
                                                        <path
                                                            className="fill-current rounded-full" 
                                                            d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                                                        /> 
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-lg font-semibold mx-2 text-center">
                                                <button
                                                    className="focus:outline-none bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center"
                                                    onClick={() => handleAddToCart(product?.id)}
                                                    style={{cursor: `${product?.stock > 0 ? "pointer" : "not-allowed"}`}}
                                                    disabled={product?.stock === 0}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-lg font-semibold text-center">
                                                <button
                                                    className="focus:outline-none bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-2 rounded-full inline-flex items-center"
                                                    onClick={() => handleOpenModal(product)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                        width="21" height="21"
                                                        viewBox="0 0 32 32"
                                                        
                                                        style={{fill:"#000000"}}
                                                    >    
                                                        <path 
                                                            className="fill-current text-white"
                                                            d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div
                        className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4"
                    >
                        <OrderDetails products={cartProducts} />
                    </div>
                </div>
            </div>
            <OurModal/>
        </React.Fragment>
    )
}

export default ShippingCart;

// const mapStateToProps = (state, ownProps) => {
//     console.log({ state });
//     return{
//         products: state?.shippingCartReducer?.products,
//         total_items: state?.shippingCartReducer?.total_items,
//         ...ownProps,
//     }
// };

// const mapDispatchToProps = (dispatch) => (
//     {
//         addToCart: (id) => dispatch(addProductToCart(id)),
//         removeFromCart: (id) => dispatch(removeProductFromCart(id)),
//     }
// );



// export default connect(mapStateToProps, mapDispatchToProps)(ShippingCart);