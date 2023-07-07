import { useMutation, useQuery } from "react-query";
import apiClient from "../utils/apiClient";
type User = {
  name: string;
  image: string;
  _id: string;
};
type Community = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  userId: User;
  likes: User[];
};
export const useCreateCommunity = () => {
  return useMutation<void, Error, { title: string; content: string }>(
    async ({ title, content }) => {
      const response = await apiClient.post(`/api/community`, {
        title,
        content,
      });
      return response.data;
    }
  );
};

export const useCreateComment = () => {
  return useMutation<void, Error, { communityId: string; content: string }>(
    async ({ communityId, content }) => {
      const response = await apiClient.post(`/api/comment`, {
        communityId,
        content,
      });
      return response.data;
    }
  );
};
export const useGetCommunity = () =>
  useQuery({
    queryKey: ["Community"],
    queryFn: async () =>
      (await apiClient.get<Community[]>(`/api/community`)).data,
  });

export const useGetComment = (slug: string) =>
  useQuery({
    queryKey: ["Comment"],
    queryFn: async () =>
      (await apiClient.get<Community[]>(`/api/comment/${slug}`)).data,
  });

export const useGetCommentLength = (_id: string) =>
  useQuery({
    queryKey: ["CommentLength", _id],
    queryFn: async () =>
      (await apiClient.get<number>(`/api/comment/length/${_id}`)).data,
  });
export const useGetDetailCommunity = (_id: string) =>
  useQuery({
    queryKey: ["CommunityDetail", _id],
    queryFn: async () =>
      (await apiClient.get<Community>(`/api/community/${_id}`)).data,
  });

export const useDeleteCommunity = () => {
  return useMutation<void, Error, string>(async (communityId) => {
    await apiClient.delete(`/api/community/${communityId}`);
  });
};

export const useDeleteComment = () => {
  return useMutation<void, Error, string>(async (commentId) => {
    await apiClient.delete(`/api/comment/${commentId}`);
  });
};

export const useDeleteOneComment = () => {
  return useMutation<void, Error, string>(async (commentId) => {
    await apiClient.delete(`/api/comment/one/${commentId}`);
  });
};

export const useSearchCommunity = (searchTerm: string) => {
  return useQuery<Community[], Error>(
    ["SearchCommunity", searchTerm],
    async () => {
      const response = await apiClient.get<Community[]>(
        `/api/community/search?q=${searchTerm}`
      );
      return response.data;
    }
  );
};

export const useToggleLike = () => {
  return useMutation<number, Error, { communityId: string }>(
    async ({ communityId }) => {
      const response = await apiClient.post(
        `/api/community/${communityId}/like`
      );
      return response.data.likes;
    }
  );
};

export const useGetCommunityByUser = () => {
  return useQuery<Community[], Error>("CommunityByUser", async () => {
    const response = await apiClient.get<Community[]>("/api/community/user");
    return response.data;
  });
};
