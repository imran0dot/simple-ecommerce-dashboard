/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/lib/axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

const axiosBaseQuery =
  (): BaseQueryFn<{ url: string; method: any; data?: any; params?: any }, unknown, unknown> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as any;
      return { error: { status: err.response?.status, data: err.response?.data } };
    }
  };

export default axiosBaseQuery;
