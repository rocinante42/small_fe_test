


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;
      const clientToken = (getState() as RootState).auth.clientToken;
      if (accessToken) {
        headers.set('Access-Token', `Bearer ${accessToken}`);
      }
      if (clientToken) {
        headers.set('Client-Token', clientToken);
      }
      return headers;
    },

  }),
  tagTypes: ['UserProfile', 'StoreInfo'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserProfile: builder.query({
      query: () => '/self/profile',
      providesTags: (_) => ['UserProfile'],
    }),
    getStoreInfo: builder.query({
      query: (id) => `/store/${id}`,
      providesTags: (_) => ['StoreInfo'],
    }),
  }),
});

export const { useLoginMutation, useGetUserProfileQuery, useGetStoreInfoQuery, useLazyGetStoreInfoQuery } = api;