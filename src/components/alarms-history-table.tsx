"use client";

import { useEffect, useState } from "react";
import { NavButton } from "./ui/nav-button";
import { ChevronDown, ChevronUp } from "lucide-react";
import useKeybind from "@/hooks/use-keybind";
import { useStore } from "@/store";
import { Alarm } from "@/slices/alarmsSlice";
import axios from "axios";
import { LineSpinner } from "ldrs/react";

type PaginationResponse = {
  nextCursor?: number;
  hasNextPage: boolean;
  limit: number;
};

export const AlarmsHistoryTable = () => {
  const [data, setData] = useState<Alarm[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationResponse | undefined>(
    undefined,
  );

  const alarms = useStore((s) => s.alarms);

  const updateTable = async (cursor?: number) => {
    try {
      setIsLoading(true);

      const res = await axios.get("https://shore.stevenseboat.org/api/alarms", {
        params: { cursor },
      });

      setData((s) => {
        const newData: Alarm[] = res.data.data.map((e: Alarm) => ({
          ...e,
          raisedAt: new Date(e.raisedAt),
          acknowledgedAt: e.acknowledgedAt
            ? new Date(e.acknowledgedAt)
            : undefined,
          resolvedAt: e.resolvedAt ? new Date(e.resolvedAt) : undefined,
        }));
        if (cursor && s) return [...s, ...newData].slice(-1000);
        else return newData;
      });

      setPagination(res.data.pagination);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateTable();
  }, [alarms]);

  return (
    <div className="flex flex-col gap-2 flex-1 min-h-0">
      <div className="flex flex-col flex-1 min-h-0 bg-white border">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <table className="w-full table-fixed">
            <colgroup>
              <col span={1} className="w-[180px]" />
              <col span={1} className="w-[80px]" />
              <col span={1} className="w-[70px]" />
            </colgroup>
            <thead className="text-left border-b bg-gradient-to-b from-zinc-100 to-zinc-300 sticky top-0 z-10">
              <tr>
                <td>Timestamp</td>
                <td>Category</td>
                <td>Alarm ID</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
              {data?.map((e, idx) => (
                <tr key={idx}>
                  <td>{e.raisedAt.toLocaleString()}</td>
                  <td>
                    {e.type.toUpperCase() === "ERROR" && (
                      <div
                        className={`text-sm text-center bg-red-500 px-2 mx-2 text-white border border-red-800 ${
                          e.acknowledgedAt ? "" : "blink-slow"
                        }`}
                      >
                        ERR
                      </div>
                    )}
                    {e.type.toUpperCase() === "WARNING" && (
                      <div
                        className={`text-sm text-center bg-yellow-500 px-2 mx-2 text-white border border-red-800 ${
                          e.acknowledgedAt ? "" : "blink-slow"
                        }`}
                      >
                        WARN
                      </div>
                    )}
                    {e.type.toUpperCase() !== "WARNING" &&
                      e.type.toUpperCase() !== "ERROR" && (
                        <div
                          className={`text-sm text-center border mx-2 bg-zinc-200`}
                        >
                          ???
                        </div>
                      )}
                  </td>
                  <td>{e.id}</td>
                  <td>{e.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {pagination?.hasNextPage ? (
            <button
              className="w-full text-center text-sm font-bold py-2 hover:cursor-pointer hover:bg-zinc-100 underline text-blue-600 hover:text-blue-800"
              onClick={() => updateTable(pagination?.nextCursor)}
            >
              Load more results
            </button>
          ) : (
            <div className="w-full text-center text-sm font-bold py-2">
              End of list
            </div>
          )}
        </div>
        {!data ||
          (data.length <= 0 && (
            <div className="bg-gradient-to-b from-lime-200 to-lime-500 px-2 border-t mt-auto">
              No records.
            </div>
          ))}
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-6 items-center bg-white border px-2 h-full">
          <p className="font-bold">
            {data?.filter((e) => !e.acknowledgedAt).length} Not Acknowledged
          </p>
          <p>{data?.length} Total</p>
        </div>
        <NavButton onClick={() => updateTable()}>REFRESH</NavButton>
        {isLoading && <LineSpinner size={30} stroke={2} />}
      </div>
    </div>
  );
};
