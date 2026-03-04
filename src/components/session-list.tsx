"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type SessionEntry = {
  id: number;
  startTime: Date;
  endTime?: Date;
};

type Pagination = {
  cursor?: string; // ID of the last item from previous page
  limit?: string;
  order?: "asc" | "desc";
};

export const SessionList = () => {
  const [data, setData] = useState<SessionEntry | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState<Pagination | undefined>(
    undefined,
  );

  const retrieveData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://shore.stevenseboat.org/api/sessions",
      );
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
    <div className="bg-white flex-1 h-full border">
      <table className="w-full">
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
      </table>
    </div>
  );
};
