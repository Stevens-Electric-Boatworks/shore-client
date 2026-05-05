"use client";

import { apiClient } from "@/lib/auth/apiClient";
import { User } from "@/types/user";
import { useQueries, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LineSpinner } from "ldrs/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UsersResponse {
  data: User[];
  pagination: {
    nextCursor: string;
    hasNextPage: boolean;
    limit: number;
  };
}

export const UsersTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      apiClient.get<UsersResponse>("/admin/users").then((r) => r.data.data),
  });

  const router = useRouter();

  if (isLoading || !data)
    return (
      <div>
        <LineSpinner />
      </div>
    );

  return (
    <div className="flex flex-1 gap-2 min-h-0">
      <div className={`flex-2 min-h-0 border`}>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto bg-white">
            <table className="w-full border-separate border-spacing-0 ">
              <colgroup>
                <col span={1} width={200} />
                <col span={1} width={80} />
                <col span={1} width={80} />
              </colgroup>
              <thead className="sticky top-0 bg-gradient-to-b from-zinc-100 to-zinc-300 text-left border-b">
                <tr>
                  <th className="px-2 border-b font-normal">Username</th>
                  <th className="border-b font-normal">Role</th>
                  <th className="border-b font-normal">ID</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(even)]:bg-gray-100">
                {data.map((e) => (
                  <tr
                    key={e.id}
                    className="hover:bg-blue-200 hover:cursor-pointer group"
                    onClick={() => router.push(`/access/user?id=${e.id}`)}
                  >
                    <td className="group-hover:underline px-2">{e.username}</td>
                    <td>{e.role}</td>
                    <td className="text-sm font-mono">{e.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
