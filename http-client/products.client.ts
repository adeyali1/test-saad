import axios from "axios";
import { IUserProduct } from "../models/user-product";
import { productPagesEnum } from "../models/enums";

const api = axios.create({
   baseURL: "/api",
});


export const getAll = () =>
   api.get(`/user-products`).then((res) => res.data);

// export const getAllLookup = () =>
//    api.get(`/products/lookup`).then((res) => res.data);

// export const getLookup = (courseId) =>
//   api.get(`/products/lookup/${productId}`).then((res) => res.data);

export const insertOne = (userProduct: IUserProduct) =>
   api.post(`/user-products`, userProduct).then((res) => res.data);

export const updateOne = (userProduct: IUserProduct, path: productPagesEnum) =>
   api.put(`/user-products`, { userProduct, path }).then((res) => res.data);

export const getOne = (id: string) =>
   api.get(`/user-products/${id}`).then((res) => res.data);

export const Keys = {
   All: "USER_PRODUCTS_LIST",
   UserProduct: "USER_PRODUCT",
   Lookup: "USER_PRODUCT_LOOKUP",
   AllLookup: "ALL_USER_PRODUCTS_LOOKUP",
};
