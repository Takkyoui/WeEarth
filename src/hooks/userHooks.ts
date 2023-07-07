import { useMutation, useQuery } from "react-query";
import apiClient from "../utils/apiClient";

type User = {
  email: string;
  password: string;
  name: string;
  image?: string;
};
type Profile = {
  name: string;
  image: File | null;
};
type UserLogin = {
  email: string;
  password: string;
};
const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const useRegisterUserMutation = () => {
  return useMutation<void, Error, User>(async ({ email, name, password }) => {
    const response = await apiClient.post("/api/register", {
      email,
      name,
      password,
    });
    console.log(response.data);
    return response.data;
  });
};

export const useLoginUserMutation = () => {
  return useMutation<void, Error, UserLogin>(async ({ email, password }) => {
    const response = await apiClient.post("/api/login", {
      email,
      password,
    });
    return response.data;
  });
};

export const useGetDetailCommunity = (_id: string) =>
  useQuery({
    queryKey: ["CommunityDetail", _id],
    queryFn: async () =>
      (await apiClient.get<User>(`/api/community/${_id}`)).data,
  });

export const useGetUserQuery = () => {
  return useQuery<User, Error>("User", async () => {
    const response = await apiClient.get<User>("/api/user");
    return response.data;
  });
};

export const useUpdatePasswordMutation = () => {
  return useMutation<void, Error, { newPassword: string }>(
    async ({ newPassword }) => {
      const response = await apiClient.patch("/api/update-password", {
        newPassword,
      });
      console.log(response.data);
      return response.data;
    }
  );
};

export const useUpdateUserMutation = () =>
  useMutation<void, Error, Profile>(
    async (formData) =>
      (await apiClient.put("/api/update", formData, config)).data
  );

export const useDeleteUserMutation = () => {
  return useMutation<void, Error>(async () => {
    await apiClient.delete("/api/user");
  });
};
