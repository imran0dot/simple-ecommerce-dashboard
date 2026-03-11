import baseApi from '../api/baseApi';

const SERVICE_URL = 'brand';
const TAG = 'Brand';

const brandApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    get: builder.query({
      query: params => ({
        url: `/${SERVICE_URL}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),

    create: builder.mutation({
      query: data => ({
        url: `/${SERVICE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: [TAG],
    }),

    update: builder.mutation({
      query: ({ id, ...categoryData }) => ({
        url: `/${SERVICE_URL}/update/${id}`,
        method: 'PUT',
        data: categoryData,
      }),
      invalidatesTags: [TAG],
    }),

    delete: builder.mutation({
      query: ({ id }) => ({
        url: `/${SERVICE_URL}/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { useGetQuery, useCreateMutation, useUpdateMutation, useDeleteMutation } = brandApi;

export default brandApi;
