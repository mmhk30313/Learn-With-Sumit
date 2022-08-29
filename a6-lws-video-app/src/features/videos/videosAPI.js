import axios from "../../utils/axios";

export const getVideos = async (tags, search) => {
    let queryString = "";

    if (tags?.length > 0) {
        queryString += tags.map((tag) => `tags_like=${tag}`).join("&");
    }

    if (search !== "") {
        queryString += `&q=${search}`;
    }

    const response = await axios.get(`/videos/?${queryString}`);

    return response.data;
};

export const getPageVideos = async (tags, search, page, limit) => {
    const start = page * limit;
    let queryString = "";
    console.log({start, limit});
    if (tags?.length > 0) {
        queryString += tags.map((tag) => `tags_like=${tag}`).join("&");
    }

    if (search) {
        queryString += `&q=${search}`;
    }
    const response = await axios.get(`/videos?${queryString}&_start=${start}&_limit=${limit}`);

    return response.data;
}
