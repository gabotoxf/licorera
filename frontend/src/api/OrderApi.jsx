import AxiosClient from "./AxiosClient";

export const getOrders = () => AxiosClient.get("/orders");
