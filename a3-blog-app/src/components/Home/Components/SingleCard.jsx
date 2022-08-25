import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBlog, filterBlogByAuthor, filterBlogByType } from '../../../redux/filters/actions';
import { openModal } from '../../../redux/modalOpen/action';

const SingleCard = ({blog}) => {
    const dispatch = useDispatch();
    
    return (
        <React.Fragment>
           <div
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
                <div className="flex-shrink-0">
                    <img
                        className="h-48 w-full object-cover"
                        src={blog?.blog_img || "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"}
                        alt=""
                    />
                </div>

                <div
                    className="flex-1 bg-white p-6 flex flex-col justify-between"
                >
                    <div className="flex-1">
                        <p className="text-sm font-medium text-indigo-600 relative">
                            <span
                                onClick={() => dispatch(filterBlogByType(blog?.category))}
                                className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-300 cursor-pointer transition ease-in-out duration-150"
                            >
                                {blog?.category || "Article"}
                            </span>
                            <span className='flex justify-end absolute right-0 top-0'>
                                <span
                                    onClick={() => dispatch(openModal(blog))}
                                    className="mr-2 p-1.5 rounded-full text-sm font-medium bg-yellow-300 text-yellow-800 hover:bg-yellow-500 cursor-pointer transition-colors ease-in-out duration-150"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                        width="23" height="21"
                                        viewBox="0 0 32 32"
                                        
                                        style={{fill:"#000000"}}
                                    >    
                                        <path 
                                            className="fill-current text-white"
                                            d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"
                                        />
                                    </svg>
                                </span>
                                <span
                                    onClick={() => dispatch(deleteBlog(blog?.id))}
                                    className=" px-1.5 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800 hover:bg-red-500 cursor-pointer transition ease-in-out duration-150"
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
                                </span>

                            </span>
                        </p>
                        <div className="block mt-1 w-fit">
                            <p
                                className="text-xl font-semibold text-gray-900 cursor-pointer"
                            >
                                {blog?.title || "Boost your conversion rate"}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                onClick={() => dispatch(filterBlogByAuthor(blog?.author))}
                                className="h-10 w-10 rounded-full cursor-pointer"
                                src={blog?.author_img || "https://avatars.githubusercontent.com/u/73503432?v=4"}
                                alt=""
                            />
                        </div>
                        <div className="ml-3">
                            <p
                                onClick={() => dispatch(filterBlogByAuthor(blog?.author))}
                                className="text-sm font-medium text-gray-900 hover:cursor-pointer"
                            >
                                {blog?.author || "Learn with sumit"}
                            </p>
                            <div
                                className="flex space-x-1 text-sm text-gray-500"
                            >
                                <time dateTime="2020-03-16"
                                >
                                    {blog?.createdAt ? new Date(blog?.createdAt).toDateString() + ", " + new Date(blog?.createdAt).toLocaleTimeString()  : "Mon Aug 22 2022, 10:10:15 PM"}
                                </time>
                                <span aria-hidden="true">
                                    &middot;
                                </span>
                                <span> {Math.floor(Math.random()*10)} min read </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </React.Fragment>
    );
};

export default SingleCard;