import { 
    FILTER_BLOG_BY_SEARCH_TITLE, 
    FILTER_BLOG_BY_AUTHOR, 
    FILTER_BLOG_BY_CATEGORY,
    ADD_BLOG,
    DELETE_BLOG,
    UPDATE_BLOG,
    UN_FILTER_BLOG,
} from "./actionTypes";

export const saveBlog = (blog) => {
    return {
        type: ADD_BLOG,
        payload: blog,
    };
}

export const deleteBlog = (id) => {
    return {
        type: DELETE_BLOG,
        payload: id,
    };
}

export const updateBlog = (blog) => {
    return {
        type: UPDATE_BLOG,
        payload: blog,
    };
}

export const filterBlogBySearchName = (searchTitle = "") => {
    return {
        type:    FILTER_BLOG_BY_SEARCH_TITLE,
        payload: searchTitle,
    }
}

export const filterBlogByAuthor = (author = "") => {
    return {
        type:    FILTER_BLOG_BY_AUTHOR,
        payload: author,
    }
}

export const filterBlogByType = (category) => {
    // console.log({category});
    return {
        type:    FILTER_BLOG_BY_CATEGORY,
        payload: category,
    }
}

// mmhk-endregion