import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default AxiosClient;
