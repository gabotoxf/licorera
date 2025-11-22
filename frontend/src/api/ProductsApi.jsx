import AxiosClient from "./AxiosClient";

export const getProducts = () => AxiosClient.get("/products");
export const createProduct = (data) => AxiosClient.post("/products", data);
export const updateProduct = (id, data) => AxiosClient.put(`/products/${id}`, data);
export const deleteProduct = (id) => AxiosClient.delete(`/products/${id}`);
