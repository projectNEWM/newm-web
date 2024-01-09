import { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { AxiosProgressEvent, AxiosRequestConfig } from "axios";

export type OnUploadProgress = (event: AxiosProgressEvent) => void;

export type BaseQuery = BaseQueryFn<
  {
    body?: AxiosRequestConfig["data"];
    headers?: AxiosRequestConfig["headers"];
    method: AxiosRequestConfig["method"];
    onUploadProgress?: OnUploadProgress;
    params?: AxiosRequestConfig["params"];
    url: string;
  },
  unknown,
  unknown
>;

export interface AxiosBaseQueryParams {
  readonly baseUrl: string;
  readonly prepareHeaders?: (
    api: BaseQueryApi,
    headers?: AxiosRequestConfig["headers"]
  ) => AxiosRequestConfig["headers"];
}
