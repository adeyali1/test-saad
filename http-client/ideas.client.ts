import axios from "axios";
import { IUserIdeas } from '../models/user-idea';
import { IIdea } from "../models/types";

const api = axios.create({
   baseURL: "/api",
});

export const getOne = () =>
   api.get(`/user-ideas`).then((res) => res.data);

export const getOneLookup = () =>
   api.get(`/user-ideas/lookup`).then((res) => res.data);

export const insertOne = (userIdeas: IUserIdeas) =>
   api.post(`/user-ideas`, userIdeas).then((res) => res.data);

export const updateOne = (userIdeas: IUserIdeas) =>
   api.put(`/user-ideas`, userIdeas).then((res) => res.data);

export const insertOneLookup = (idea: IIdea) =>
   api.post(`/user-ideas/lookup`, idea).then((res) => res.data);

export const updateOneLookup = (idea: IIdea) =>
   api.post(`/user-ideas/lookup`, idea).then((res) => res.data);

export const deleteOne = (uuid: string) =>
   api.delete(`/user-ideas/${uuid}`).then((res) => res.data);

export const Keys = {
   All: "USER_IDEAS_LIST",
   AllLookup: "ALL_USER_IDEAS_LOOKUP",
};
