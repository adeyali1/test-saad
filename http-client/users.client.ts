import axios from "axios";
import { IUser } from "../models/user";

const api = axios.create({
   baseURL: "/api",
});

export const getAll = () =>
   api.get(`/users`).then((res) => res.data);

export const getAllLookup = () =>
   api.get(`/users/lookup`).then((res) => res.data);

// export const getLookup = (courseId) =>
//   api.get(`/users/lookup/${userId}`).then((res) => res.data);

export const insertOne = (user: IUser) =>
   api.post(`/users`, user).then((res) => res.data);

export const updateOne = (user: IUser) =>
   api.put(`/users/${user.id}`, user).then((res) => res.data);

export const getOne = (id: string) =>
   api.get(`/users/${id}`).then((res) => res.data);

export const Keys = {
   All: "USERS_LIST",
   User: "USER",
   Lookup: "USER_LOOKUP",
   AllLookup: "ALL_USERS_LOOKUP",
};
