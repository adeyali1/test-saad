import axios from "axios";
import { IUserCustomers } from "../models/user-customers";

const api = axios.create({
   baseURL: "/api",
});

export const insertOne = (userCustomers: IUserCustomers) =>
   api.post(`/user-customers`, userCustomers).then((res) => res.data);

export const updateOne = (userCustomers: IUserCustomers) =>
   api.put(`/user-customers`, userCustomers).then((res) => res.data);

export const getOne = () =>
   api.get(`/user-customers`).then((res) => res.data);

export const Keys = {
   All: "USER_CUSTOMERS_LIST",
};
