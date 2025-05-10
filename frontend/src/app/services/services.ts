import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const typeTesterApi = createApi({
  reducerPath: "typeTester",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllWords: builder.query<unknown, void>({
      query: () => "/words/",
    }),

    finalResult: builder.mutation({
      query: (finalResult) => ({
        url: `/scores/`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: finalResult,
      }),
    }),

    getFinalResultData: builder.query<unknown, void>({
      query: () => ({
        url: `/scores/`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const authorizationApi = createApi({
  reducerPath: "authorization",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginCredentials) => ({
        url: `/user/login`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: loginCredentials,
      }),
    }),

    register: builder.mutation({
      query: (signupCredentials) => ({
        url: `/user/signup`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: signupCredentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `/user/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAllWordsQuery,
  useFinalResultMutation,
  useGetFinalResultDataQuery,
} = typeTesterApi;

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authorizationApi;
