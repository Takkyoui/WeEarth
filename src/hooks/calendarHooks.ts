import { useMutation, useQuery } from "react-query";
import apiClient from "../utils/apiClient";

type Calendar = {
  _id: string;
  title: string;
  content: string;
  score: string;
  image?: File;
  createdAt: Date;
};
const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const useGetDiary = () =>
  useQuery({
    queryKey: ["Calendar"],
    queryFn: async () =>
      (await apiClient.get<Calendar[]>(`/api/calendar`)).data,
  });

export const useCreateDiary = () => {
  return useMutation<void, Error, Calendar>(async (formData) => {
    const response = await apiClient.post(`/api/calendar`, formData, config);
    return response.data;
  });
};

export const useGetCalendarById = (id: string) => {
  return useQuery<Calendar>({
    queryKey: ["Calendar", id],
    queryFn: async () =>
      (await apiClient.get<Calendar>(`/api/calendar/${id}`)).data,
  });
};

//삭제
export const useDeleteCalendar = () => {
  return useMutation<void, Error, string>(async (id) => {
    await apiClient.delete(`/api/calendar/${id}`);
  });
};

//수정
export const useUpdateCalendar = () => {
  return useMutation<void, Error, { id: string; formData: Calendar }>(
    async ({ id, formData }) => {
      await apiClient.put(`/api/calendar/${id}`, formData, config);
    }
  );
};
//
export const useGetTodayPosts = () => {
  return useQuery({
    queryKey: ["TodayPosts"],
    queryFn: async () =>
      (await apiClient.get<{ hasTodayPost: boolean }>(`/api/calendar/today`))
        .data,
  });
};
