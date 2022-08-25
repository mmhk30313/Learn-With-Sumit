import { 
    FILTER_BLOG_BY_SEARCH_TITLE,
    FILTER_BLOG_BY_AUTHOR,
    FILTER_BLOG_BY_CATEGORY,
    ADD_BLOG,
    UPDATE_BLOG,
    DELETE_BLOG,
    // UN_FILTER_BLOG,
} from "./actionTypes";

import initialState from "./initialState";

const reducer = (state = initialState, action) => {
    // console.log({action});
    switch (action.type) {
        case ADD_BLOG:
            return {
                ...state,
                blogs: [...state.blogs, action.payload],
                filterBlogs: [...state.filterBlogs, action.payload].sort((a, b) => b.id - a.id),
            };
        case UPDATE_BLOG:
            return {
                ...state,
                blogs: state.blogs.map((blog) => {
                    if (blog.id === action.payload.id) {
                        return action.payload;
                    }
                    return blog;
                }),
                filterBlogs: state.filterBlogs.map((blog) => {
                    if (blog.id === action.payload.id) {
                        return action.payload;
                    }
                    return blog;
                }),
            };
        case DELETE_BLOG:
            return {
                ...state,
                blogs: state.blogs.filter((blog) => blog.id !== action.payload),
                filterBlogs: state.filterBlogs.filter((blog) => blog.id !== action.payload),
            };

        case FILTER_BLOG_BY_AUTHOR:
            return {
                ...state,
                filterBlogs: state?.filterBlogs?.filter(blog => blog.author === action.payload)
                        .sort((a, b) => b.id - a.id),
            };
            
        case FILTER_BLOG_BY_SEARCH_TITLE:
            return {
                ...state,
                filterBlogs: state?.blogs?.filter(blog => blog?.title?.toLowerCase().includes(action?.payload?.toLowerCase()))
                            .sort((a, b) => (
                                b?.id - a?.id
                            )),
                            
            };

        case FILTER_BLOG_BY_CATEGORY:
            // console.log({action});
            return {
                ...state,
                filterBlogs: state?.filterBlogs?.filter(blog => blog?.category?.includes(action.payload))
                            .sort((a, b) => (b.id - a.id)),
            };

        

        default:
            return state;
    }
};

export default reducer;
