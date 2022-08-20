import React from 'react';
import { connect } from 'react-redux';
import { addProductToCart, removeProductFromCart } from '../redux/shippingCart/actions';
import ShippingController from './ShippingController';

const OrderDetails = (props) => {
    const { total_items, total_price, message, addToCart, removeFromCart, products } = props;
    return (
        <React.Fragment>
            <ShippingController products={products} total_items={total_items} message={message} addToCart={addToCart} removeFromCart={removeFromCart} />
            <div
                className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-4"
            >
                <div
                    className="flex justify-center items-center text-center"
                >
                    <div className="text-xl font-semibold">
                        <p>Total Price</p>
                        <p className="text-5xl">{total_price}</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state, ownProps) => {
    // console.log({ state });
    return{
        total_items: state?.shippingCartReducer?.total_items,
        total_price: state?.shippingCartReducer?.total_cost,
        message: state?.shippingCartReducer?.message,
        ...ownProps,
    }
};

const mapDispatchToProps = (dispatch) => (
    {
        addToCart: (id) => dispatch(addProductToCart(id)),
        removeFromCart: (id) => dispatch(removeProductFromCart(id)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps) (OrderDetails);
