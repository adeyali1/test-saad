import axios from "axios";
import { IUser } from "../models/user";

const api = axios.create({
  baseURL: '/api',
});

export const singUp = (user: IUser) =>
  api.post('/auth/signup', user).then((res) => res.data);

export const login = (credentials: { email: string, password: string }) =>
  api.post('/auth/login', credentials).then((res) => res.data);

export const Keys = {
};
