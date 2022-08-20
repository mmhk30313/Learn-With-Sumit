/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modalOpen/action';
import { addProductToStock, editProductFromStock } from '../../redux/shippingCart/actions';

export default function OurModal() {
    const {isOpen, product: editableProduct} = useSelector(state => state?.modalReducer);
    const dispatch = useDispatch();
    // console.log({isOpen});
    const cancelButtonRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id: editableProduct?.id || Number(new Date()),
            name: e.target.product_name.value, 
            price: Number(e.target.price.value), 
            stock: Number(e.target.stock.value)
        }

        // console.log({formData});
        dispatch(editableProduct ? editProductFromStock(formData) : addProductToStock(formData));
        dispatch(closeModal());
        // e.target.reset();
    }


    return (
        <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => dispatch(closeModal())}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="flex flex-col">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 border-b my-3 py-2">
                                    Product Form
                                </Dialog.Title>
                                    <div className="mt-2">
                                        <form className='form' id='product-form' onSubmit={handleSubmit}>
                                            <div className="shadow overflow-hidden sm:rounded-md">
                                                <div className="px-4 py-5 bg-white sm:p-6">
                                                    <div className="grid grid-cols-12 gap-6">
                                                        <div className="col-span-12 sm:col-span-12">
                                                        <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">
                                                            Product name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="product_name"
                                                            id="product_name"
                                                            defaultValue={editableProduct?.name}
                                                            // placeholder='Product name'
                                                            required={true}
                                                            className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-purple-500"
                                                        />
                                                        </div>


                                                        <div className="col-span-12 sm:col-span-12 lg:col-span-12">
                                                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                                                Stock quantity
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="stock"
                                                                id="stock"
                                                                defaultValue={editableProduct?.stock}
                                                                // placeholder='Stock quantity'
                                                                required={true}
                                                                min={0}
                                                                className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-purple-500"
                                                            />
                                                        </div>
                                                        
                                                        <div className="col-span-12 sm:col-span-12 lg:col-span-12">
                                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                                Price
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="price"
                                                                id="price"
                                                                defaultValue={editableProduct?.price}
                                                                // placeholder='Price'
                                                                required={true}
                                                                min={0}
                                                                className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-purple-500"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm text-uppercase"
                                htmlFor='product-form'
                                form='product-form'
                            >
                                {
                                    editableProduct ? 'Update' : 'Add'
                                }
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => dispatch(closeModal())}
                                ref={cancelButtonRef}
                            >
                                CANCEL
                            </button>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
        </Transition.Root>
    )
}
