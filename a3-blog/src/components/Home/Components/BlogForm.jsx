import React, { useCallback } from 'react';
import { Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dialog, Transition } from '@headlessui/react';
import { closeModal } from '../../../redux/modalOpen/action';
// import OurModal from '../../OurModal/OurModal';
import { saveBlog, updateBlog } from '../../../redux/filters/actions';
import OurModal from '../../OurModal/OurModal';
import REACT_APP_UNSPLASH_KEY from '../../../config';
const deleteIcon = require('../../../assets/trash.png');
const uploadIcon = require('../../../assets/upload-icon.png');

const BlogForm = () => {
    const {isOpen, blog: editableBlog} = useSelector(state => state?.modalState);

    const [beforeUploadImg, setBeforeUploadImg] = React.useState(null);
    const [beforeAuthorImg, setBeforeAuthorImg] = React.useState(null);
    const dispatch = useDispatch();
    const cancelButtonRef = useRef(null)
    // console.log("Unsplash key: ", REACT_APP_UNSPLASH_KEY);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataObj = {
            id: editableBlog?.id || Number(new Date()),
            title: e?.target?.title?.value, 
            author: e?.target?.author?.value, 
            category: e?.target?.category?.value,
            blog_img: editableBlog?.blog_img || "",
            author_img: editableBlog?.author_img || "",
            createdAt: editableBlog?.createdAt || new Date(),
        }
        
        if (beforeUploadImg || beforeAuthorImg) {
            const imgData = new FormData();
            imgData.set("key", REACT_APP_UNSPLASH_KEY);
            if (beforeUploadImg) {
                imgData.append('image', beforeUploadImg);
                fetch("https://api.imgbb.com/1/upload", {
                    method: 'POST',
                    body: imgData,
                    // If you add this, upload won't work
                    // headers: {
                    //   'Content-Type': 'multipart/form-data',
                    // }
                })
                .then(res => res.json())
                .then(blogImg => {
                    // console.log(blogImg.data.display_url);
                
                    dataObj.blog_img = blogImg?.data?.display_url;
                    if (beforeAuthorImg) {
                        imgData.append('image', beforeAuthorImg);
                        fetch("https://api.imgbb.com/1/upload", {
                            method: 'POST',
                            body: imgData,
                            // If you add this, upload won't work
                            // headers: {
                            //   'Content-Type': 'multipart/form-data',
                            // }
                        })
                        .then(res => res.json())
                        .then(authorImg => {
                            dataObj.author_img = authorImg?.data?.display_url;
                            console.log({dataObj});
                            if(editableBlog) {
                                dispatch(updateBlog(dataObj));
                            } else {
                                dispatch(saveBlog(dataObj));
                            }
                            dispatch(closeModal());
                        })  
                    }else{
                        if(editableBlog) {
                            dispatch(updateBlog(dataObj));
                        } else {
                            dispatch(saveBlog(dataObj));
                        }
                        dispatch(closeModal());
                    }           
        
                })
                .catch(err => console.log(err));
            }else{
                imgData.append('image', beforeAuthorImg);
                fetch("https://api.imgbb.com/1/upload", {
                    method: 'POST',
                    body: imgData,
                    // If you add this, upload won't work
                    // headers: {
                    //   'Content-Type': 'multipart/form-data',
                    // }
                })
                .then(res => res.json())
                .then(authorImg => {
                    dataObj.author_img = authorImg?.data?.display_url;
                    console.log({dataObj});
                    if(editableBlog) {
                        dispatch(updateBlog(dataObj));
                    } else {
                        dispatch(saveBlog(dataObj));
                    }
                    dispatch(closeModal());
                })
                .catch(err => console.log(err));
            }
        }else if(editableBlog) {
            dispatch(updateBlog(dataObj));
            dispatch(closeModal());
        }

    }

    return (
        <React.Fragment>
            <OurModal isOpen={isOpen} cancelButtonRef={cancelButtonRef}>
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
                                        Blog Form
                                    </Dialog.Title>
                                        <div className="mt-2">
                                            <form className='form' id='product-form' onSubmit={handleSubmit}>
                                                <div className="overflow-hidden sm:rounded-md">
                                                    <div className="px-4 py-3 bg-white sm:p-6">
                                                        <div 
                                                            className='flex justify-end'
                                                            onClick={() => {
                                                                setBeforeUploadImg(null);
                                                            }}
                                                        >
                                                            <img style={{cursor: 'pointer', padding: "2px", height: 25, width: 25}} className="rounded-full mb-2 border flex justify-end hover:bg-red-200" src={deleteIcon} />
                                                        </div>
                                                        
                                                        <div className='flex justify-end block mb-3'>
                                                            {
                                                                beforeUploadImg || editableBlog?.blog_img 
                                                                ? <label  htmlFor="image">
                                                                    <img style={{height: 100, width: 100}} 
                                                                        className="rounded-lg p-1 border flex justify-end cursor-pointer" 
                                                                        src={beforeUploadImg ? URL.createObjectURL(beforeUploadImg) : editableBlog?.blog_img } alt="blog-img" 
                                                                    />
                                                                </label>
                                                                : <label 
                                                                    className='z-10 flex flex-col justify-end border p-1 rounded-lg text-orange-300'
                                                                    style={{cursor: 'pointer'}} 
                                                                    htmlFor="image"
                                                                  >
                                                                    <img style={{height: 25, width: 25}} className="rounded-full mx-auto" src={uploadIcon} />
                                                                    <small className='text-sm'>Upload Blog Image</small>
                                                                </label>
                                                                // : <img style={{height: 100, width: 100}} className="rounded-lg p-1 border flex justify-end" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="blog-img" />
                                                            }
                                                            
                                                        </div>
                                                        
                                                        <input id="image" type="file" onChange={(e) => {
                                                            console.log({img: e?.target?.files[0]});
                                                            setBeforeUploadImg(e?.target?.files[0]);
                                                        }} className="hidden" placeholder="Business Image" />

                                                        <div className="grid grid-cols-12 gap-6">
                                                            <div className="col-span-12 sm:col-span-12">
                                                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                                    Blog title
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="title"
                                                                    id="title"
                                                                    defaultValue={editableBlog?.title}
                                                                    required={true}
                                                                    className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-purple-500"
                                                                />
                                                            </div>

                                                            <div className="col-span-12 sm:col-span-12 lg:col-span-12">
                                                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                                                    Category
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="category"
                                                                    id="category"
                                                                    defaultValue={editableBlog?.category}
                                                                    required={true}
                                                                    min={0}
                                                                    className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-purple-500"
                                                                />
                                                            </div>

                                                            <div className="col-span-12 sm:col-span-12 lg:col-span-12">
                                                                <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                                                                    Author name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="author"
                                                                    id="author"
                                                                    defaultValue={editableBlog?.author}
                                                                    required={true}
                                                                    min={0}
                                                                    className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-purple-500"
                                                                />
                                                            </div>
                                                            
                                                            <div className="col-span-12 sm:col-span-12 lg:col-span-12">
                                                                <div 
                                                                    className='flex justify-start'
                                                                    onClick={() => setBeforeAuthorImg(null)}
                                                                >
                                                                    <img style={{cursor: 'pointer', padding: "2px", height: 25, width: 25}} className="rounded-full mb-2 border flex justify-end hover:bg-red-200" src={deleteIcon} />
                                                                </div>
                                                        
                                                                <div className='flex justify-start block mb-3'>
                                                                    {
                                                                        beforeAuthorImg || editableBlog?.author_img
                                                                        ? <label htmlFor="author-image">
                                                                            <img style={{height: 70, width: 70}} 
                                                                                className="rounded-full p-1 border flex justify-center cursor-pointer" 
                                                                                src={beforeAuthorImg ? URL.createObjectURL(beforeAuthorImg) : editableBlog?.author_img} alt="blog-img" 
                                                                            />
                                                                        </label>
                                                                        : <label 
                                                                            className='z-10 flex flex-col justify-end border p-1 rounded-lg text-green-300'
                                                                            htmlFor="author-image"
                                                                            style={{cursor: 'pointer'}}
                                                                          >
                                                                            <img style={{height: 25, width: 25}} className="rounded-full mx-auto uppercase" src={uploadIcon} />
                                                                            <small className='text-sm'>Author Picture</small>
                                                                        </label>
                                                                        // : <img style={{height: 100, width: 100}} className="rounded-lg p-1 border flex justify-end" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="blog-img" />
                                                                    }
                                                                </div>
                                                        
                                                                <input id="author-image" type="file" onChange={(e) => {
                                                                    console.log({img: e?.target?.files[0]});
                                                                    setBeforeAuthorImg(e?.target?.files[0]);
                                                                }} className="hidden" placeholder="Author Image" />

                                                            </div>
                                                        </div>
                                                        <p className='text-center text-purple-500 text-sm animate-bounce'>Upload Blog Image And Author Picture</p>
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
                                    className="uppercase w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm text-uppercase"
                                    htmlFor='product-form'
                                    form='product-form'
                                >
                                    {
                                        editableBlog ? 'Update' : 'Save'
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
            </OurModal>
        </React.Fragment>
    );
};

export default BlogForm;