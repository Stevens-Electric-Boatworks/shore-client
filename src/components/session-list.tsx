"use client";

import axios from "axios";
import { LineSpinner } from "ldrs/react";
import { useEffect, useState } from "react";
import { NavButton } from "./ui/nav-button";

type SessionEntry = {
  id: number;
  startTime: Date;
  endTime?: Date;
};

type PaginationResponse = {
  nextCursor?: number;
  hasNextPage: boolean;
  limit: number;
};

export const SessionList = () => {
  const [data, setData] = useState<SessionEntry[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState<PaginationResponse | undefined>(
    undefined,
  );

  const retrieveData = async (cursor?: number) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://shore.stevenseboat.org/api/sessions",
        { params: { cursor } },
      );
      setData((s) => {
        const newData: SessionEntry[] = res.data.data.map(
          (e: SessionEntry) => ({
            ...e,
            startTime: new Date(e.startTime),
            endTime: e.endTime ? new Date(e.endTime) : undefined,
          }),
        );
        if (cursor && s) return [...s, ...newData].slice(-1000);
        else return newData;
      });
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div className="bg-white border flex flex-col h-full">
      <div className="p-2 flex items-center bg-gradient-to-b from-zinc-100 to-zinc-300 border-b shrink-0">
        <p className="font-bold">Session List</p>
        <div className="ml-auto flex gap-2 items-center">
          {isLoading && <LineSpinner size={20} stroke={1.5} color="#333" />}
          <NavButton size="small" onClick={() => retrieveData(undefined)}>
            REFRESH
          </NavButton>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto flex flex-col">
        <table className="">
          <colgroup>
            <col span={1} width={60} />
          </colgroup>
          <thead className="sticky top-0 bg-gradient-to-b from-zinc-100 to-zinc-300 text-left border-b">
            <tr>
              <th className="px-2 border-b font-normal">ID</th>
              <th className="border-b font-normal">Begin</th>
              <th className="border-b font-normal">End</th>
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(even)]:bg-gray-100 [&>tr>td:first-child]:font-bold [&>tr>td:first-child]:text-center">
            {data?.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.startTime.toLocaleString()}</td>
                <td>{e.endTime ? e.endTime?.toLocaleString() : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {pagination?.hasNextPage ? (
          <button
            className="w-full text-center text-sm font-bold py-2 hover:cursor-pointer hover:bg-zinc-100 underline text-blue-600 hover:text-blue-800"
            onClick={() => retrieveData(pagination?.nextCursor)}
          >
            Load more results
          </button>
        ) : (
          <div className="w-full text-center text-sm font-bold py-2">
            End of list
          </div>
        )}
      </div>
    </div>
  );
};
