/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";
import { toast } from "sonner";
import { logout, setToken } from "../authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `${token}`); //if your backend is accepting bearer token
    }

    return headers;
  },
});

const baseQueryWithToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  try {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
      api.dispatch(logout()); // logging out the user
    }

    return result;
  } catch {
    toast.error("Login Expired");
    console.log("catch");
    api.dispatch(logout());
    return { error: { status: 500, message: "An unexpected error occurred" } };
  }
};

const productTags = ["products", "singleProduct", "categories"];
const userTags = ["user"];

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithToken,
  tagTypes: [...productTags, ...userTags, "doses", "dose"],
  endpoints: () => ({}),
});
