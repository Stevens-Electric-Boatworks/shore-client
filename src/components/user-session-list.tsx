"use client";

import { apiClient } from "@/lib/auth/apiClient";
import { useQuery } from "@tanstack/react-query";

interface Props {
  id: string;
}

interface SessionResponse {
  data: {
    id: string;
    userId: string;
    userAgent: string;
    ipAddress: string;
    createdAt: Date;
    expiresAt: Date;
    lastUsedAt: Date;
    revokedAt: Date;
  }[];
}

export const UserSessionList = ({ id }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sessions", id],
    queryFn: () =>
      apiClient
        .get<SessionResponse>("/admin/sessions", {
          params: { id },
        })
        .then((r) => r.data.data),
  });

  return (
    <div className="border bg-white">
      <table className="">
        <colgroup>
          <col span={1} width={60} />
        </colgroup>
        <thead className="sticky top-0 bg-gradient-to-b from-zinc-100 to-zinc-300 text-left border-b">
          <tr>
            <th className="px-2 border-b font-normal">Session ID</th>
            <th className="border-b font-normal">Created At</th>
            <th className="border-b font-normal">Last Used At</th>
            <th className="border-b font-normal">Revoked At</th>
            <th className="border-b font-normal">User Agent</th>
            <th className="border-b font-normal">IP Address</th>
          </tr>
        </thead>
        <tbody className="[&>tr:nth-child(even)]:bg-gray-100 [&>tr>td]:px-2">
          {data?.map((e) => (
            <tr key={e.id}>
              <td className="text-sm font-mono">{e.id}</td>
              <td>{e.createdAt.toString()}</td>
              <td>{e.lastUsedAt.toString()}</td>
              <td>{e.revokedAt ? e.revokedAt.toString() : "---"}</td>
              <td>{e.userAgent}</td>
              <td>{e.ipAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
