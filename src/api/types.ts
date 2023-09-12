import { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { AxiosProgressEvent, AxiosRequestConfig } from "axios";

export type OnUploadProgress = (event: AxiosProgressEvent) => void;

export type BaseQuery = BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig["method"];
    body?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
    onUploadProgress?: OnUploadProgress;
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
