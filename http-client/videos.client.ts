import { IVideos } from '../models/videos';
import axios from "axios";

const api = axios.create({
   baseURL: "/api",
});

export const getOne = () =>
   api.get(`/videos`).then((res) => res.data);

export const insertOne = (videos: IVideos) =>
   api.post(`/videos`, videos).then((res) => res.data);

export const updateOne = (videos: IVideos) => {
   return api.put(`/videos`, videos).then((res) => res.data);
}

export const Keys = {
   all: "all",
   videos: "VIDEOS_LIST",
};