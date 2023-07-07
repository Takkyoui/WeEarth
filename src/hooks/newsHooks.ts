import { useQuery } from "react-query";
import apiClient from "../utils/apiClient";

type News = {
  title: string;
  imageUrl: string;
  summary: string;
  link: string;
};

export const useGetNews = () => {
  return useQuery<News[], Error>("News", async () => {
    const response = await apiClient.get<News[]>("/api/news/read");
    return response.data;
  });
};
