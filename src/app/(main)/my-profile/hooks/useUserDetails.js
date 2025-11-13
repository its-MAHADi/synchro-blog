"use client";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useUserDetails() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const email = session?.user?.email;

  // 🟢 GET — fetch user details
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userDetails", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(`/api/user-details/${email}`);
      return res.data?.user;
    },
  });

  // 🟡 PATCH — update user details
  const mutation = useMutation({
    mutationFn: async (updateData) => {
      const res = await axios.patch(`/api/user-details/${email}`, updateData);
      return res.data?.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userDetails", email]); // refresh data after update
    },
  });

  return {
    user: data,
    isLoading,
    isError,
    updateUser: mutation.mutate,
    updating: mutation.isPending,
  };
}
