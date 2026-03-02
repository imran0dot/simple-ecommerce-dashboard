import baseApi from '../api/baseApi';

const SERVICE_URL = 'media';
const TAG = 'Media';

const mediaApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMedias: builder.query({
      query: params => ({
        url: `/${SERVICE_URL}`,
        method: 'GET',
        params,
      }),
      providesTags: [TAG],
    }),

    createMedia: builder.mutation({
      query: formData => {
        console.log('FormData check:', formData.get('photos')); // এটি কনসোলে ফাইলটি দেখাচ্ছে কি না চেক করুন
        return {
          url: `/${SERVICE_URL}/create`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [TAG],
    }),

    deleteMedia: builder.mutation({
      query: public_id => ({
        url: `/${SERVICE_URL}/delete`,
        method: 'DELETE',
        params: { public_id },
      }),
      invalidatesTags: [TAG],
    }),
  }),
});

export const { useGetMediasQuery, useCreateMediaMutation, useDeleteMediaMutation } = mediaApi;

export default mediaApi;
