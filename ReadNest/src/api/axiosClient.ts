import axiosInstance from "@/lib/axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const customAxios = ({ baseURL }: { baseURL?: string } = {}) => {
  return axiosInstance;
};
