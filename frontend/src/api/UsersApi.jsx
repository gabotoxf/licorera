import AxiosClient from "./AxiosClient";

export const getUsers = () => AxiosClient.get("/users");
export const createUser = (data) => AxiosClient.post("/users", data);
export const updateUser = (id, data) => AxiosClient.put(`/users/${id}`, data);
export const deleteUser = (id) => AxiosClient.delete(`/users/${id}`);
