import axios from "axios";
import getConfig from "next/config";
import { IBlob } from "../models/blob";

const { publicRuntimeConfig } = getConfig();

const api = axios.create({
  baseURL: '/api',
});

export const post = (blob: IBlob) =>
  api.post(`/dms/blob/post`, blob).then((res) => res.data);

export const getAllCourseBlobs = (courseId: string, blobType: string) =>
  api.get(`/dms/${courseId}?type=${blobType}`).then((res) => res.data);

export const deleteBlob = (blobId: string) =>
  api.delete(`/dms/blob/${blobId}`).then((res) => res.data);

export const Keys = {
  filesMetaData: 'COURSE_FILES_META_DATA'
};
