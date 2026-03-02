/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/lib/axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

// axiosBaseQuery.ts ফাইলে এই পরিবর্তনটি করুন
const axiosBaseQuery =
  (): BaseQueryFn<
    { url: string; method: any; data?: any; body?: any; params?: any },
    unknown,
    unknown
  > =>
  async ({ url, method, data, body, params }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data: data || body,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as any;
      return { error: { status: err.response?.status, data: err.response?.data } };
    }
  };
export default axiosBaseQuery;
