import axios from "axios";
import { IUserTakeaways } from "../models/user-takeaways";

const api = axios.create({
   baseURL: "/api",
});

export const insertOne = (userTakeaways: IUserTakeaways) =>
   api.post(`/user-takeaways`, userTakeaways).then((res) => res.data);

export const updateOne = (userTakeaways: IUserTakeaways) =>
   api.put(`/user-takeaways`, userTakeaways).then((res) => res.data);

export const getOne = () =>
   api.get(`/user-takeaways`).then((res) => res.data);

export const Keys = {
   all: "USER_TAKEAWAYS",
};
