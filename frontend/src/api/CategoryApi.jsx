import AxiosClient from "./AxiosClient";

export const getCategorias = () => AxiosClient.get("/categories");
export const createCategoria = (data) => AxiosClient.post("/categories", data);
export const updateCategoria = (id, data) => AxiosClient.put(`/categories/${id}`, data);
export const deleteCategoria = (id) => AxiosClient.delete(`/categories/${id}`);