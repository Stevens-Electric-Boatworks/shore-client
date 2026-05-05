"use client";

import { UserSessionList } from "@/components/user-session-list";
import { useModal } from "@/hooks/use-modal";
import { apiClient } from "@/lib/auth/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LineSpinner } from "ldrs/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const { onOpen } = useModal();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", id],
    queryFn: () =>
      apiClient
        .get("/admin/user", {
          params: { id },
        })
        .then((r) => r.data.data),
  });

  if (!id)
    return (
      <div>
        <p>No ID was specified.</p>
      </div>
    );

  if (isLoading)
    return (
      <div>
        <LineSpinner />
      </div>
    );

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="border bg-white p-2 flex-1">
          <p className="font-bold">Username</p>
          <p>{data.username}</p>
          <p className="font-bold">Role</p>
          <p>{data.role}</p>
          <p className="font-bold">User ID</p>
          <p className="font-mono">{data.id}</p>
          <p className="font-bold">Created At</p>
          <p>{data.createdAt}</p>
          <p className="font-bold">Deactivated At</p>
          <p>{data.deletedAt ?? "---"}</p>
        </div>
        <div className="flex flex-col flex-1">
          <div className="border bg-white h-full">
            <div className="sticky top-0 border-b bg-gradient-to-b from-zinc-100 to-zinc-300 px-2">
              Quick Actions
            </div>
            <div className="p-2">
              <p>Reset password</p>
              <p>Revoke all sessions</p>
              <button
                className="text-blue-700 underline hover:cursor-pointer hover:text-blue-800"
                onClick={() => onOpen("confirmUserDeactivation", { id })}
              >
                Deactivate user
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <UserSessionList id={id!} />
      </div>
    </div>
  );
}
