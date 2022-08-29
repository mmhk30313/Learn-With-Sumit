import axios from "../../utils/axios";

export const getVideo = async (id) => {
    const response = await axios.get(`/videos/${id}`);

    return response.data;
};

export const updateVideo = async (id, videoData) => {
    const response = await axios.put(`/videos/${id}`, videoData);

    return response.data;
}
