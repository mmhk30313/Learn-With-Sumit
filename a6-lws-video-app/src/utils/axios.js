import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://server-mmhk-json.herokuapp.com",
});

export default axiosInstance;
