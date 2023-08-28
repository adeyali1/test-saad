import { IUserAnalysis } from './../models/user-analysis';
import axios from "axios";

const api = axios.create({
   baseURL: "/api",
});

export const insertOne = (userAnalysis: IUserAnalysis) =>
   api.post(`/user-analysis`, userAnalysis).then((res) => res.data);

export const updateOne = (userAnalysis: IUserAnalysis) =>
   api.put(`/user-analysis`, userAnalysis).then((res) => res.data);

export const getOne = () =>
   api.get(`/user-analysis`).then((res) => res.data);

export const Keys = {
   All: "USER_ANALYSIS_LIST",
};
