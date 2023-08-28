import { IUserNonCustomers } from './../models/user-non-customers';
import axios from "axios";

const api = axios.create({
   baseURL: "/api",
});

export const insertOne = (userNonCustomers: IUserNonCustomers) =>
   api.post(`/user-non-customers`, userNonCustomers).then((res) => res.data);

export const updateOne = (userNonCustomers: IUserNonCustomers) =>
   api.put(`/user-non-customers`, userNonCustomers).then((res) => res.data);

export const getOne = () =>
   api.get(`/user-non-customers`).then((res) => res.data);

export const Keys = {
   All: "USER_NON_CUSTOMERS_LIST",
};
