import baseApi from '../api/baseApi';

const SERVICE_URL = 'categories';
const TAG = 'Category';

const categoryApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: (params) => ({
        url: `/${SERVICE_URL}`,
        method: 'GET',
        params
      }),
      providesTags: [TAG],
    }),

    createCategory: builder.mutation({
      query: categoryData => ({
        url: `/${SERVICE_URL}/create`,
        method: 'POST',
        data: categoryData,
      }),
      invalidatesTags: [TAG],
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...categoryData }) => ({
        url: `/${SERVICE_URL}/update/${id}`,
        method: 'PUT',
        data: categoryData,
      }),
      invalidatesTags: [TAG],
    }),

    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `/${SERVICE_URL}/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

export default categoryApi;
