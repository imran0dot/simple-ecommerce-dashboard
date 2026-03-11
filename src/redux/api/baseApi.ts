import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Category', 'Product', 'User', 'Media', 'Brand'],
  endpoints: () => ({}),
});

export default baseApi;
