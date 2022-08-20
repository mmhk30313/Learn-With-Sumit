import React from 'react';

const ShippingController = ({products, total_items, message, addToCart, removeFromCart}) => {
    // console.log({message});
    return (
        <React.Fragment>
           <div
                className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-4"
            >
                {
                    products.map((product) => (
                        <div key={product?.id} className="flex justify-between border-b-2 mb-2">
                            <div className="text-lg py-2">
                                <p>{product?.name}</p>

                                <small className='text-red-500 text-sm' >{product?.id === message?.pid ? message?.description : ""}</small>
                            </div>
                            <div className="text-lg py-2">
                                <div
                                    className="flex flex-row space-x-2 w-full items-center rounded-lg"
                                >
                                    <button
                                        className="focus:outline-none bg-purple-700 hover:bg-purple-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center"
                                        onClick={() => removeFromCart(product?.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M18 12H6"
                                            />
                                        </svg>
                                    </button>
                                    <p>{product?.quantity}</p>
                                    <button
                                        className="focus:outline-none bg-purple-700 hover:bg-purple-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center"
                                        onClick={() => addToCart(product?.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    ))
                }


                <div
                    className="flex justify-center items-center text-center"
                >
                    <div className="text-xl font-semibold">
                        <p>Total Item</p>
                        <p className="text-5xl">{total_items}</p>
                    </div>
                </div>
            </div> 
        </React.Fragment>
    );
};

export default ShippingController;