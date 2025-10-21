"use client";
import { NavButton } from "@/components/ui/nav-button";
import axios, { isAxiosError } from "axios";
import { useRef, useState } from "react";

export default function DataPage() {
  const fromTimeRef = useRef<HTMLInputElement | null>(null);
  const toTimeRef = useRef<HTMLInputElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const download = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!fromTimeRef.current?.value) {
        setError("No from date set.");
        return;
      }

      if (!toTimeRef.current?.value) {
        setError("No to date set.");
        return;
      }

      const fromDate = new Date(fromTimeRef.current.value);
      const toDate = new Date(toTimeRef.current.value);

      const res = await axios.get("http://localhost:5001/download", {
        params: {
          from: fromDate.getTime(),
          to: toDate.getTime(),
        },
      });
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data.error || "Unknown error.");
      } else {
        setError(err.toString());
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-2xl font-bold">Data Download</p>
      <div className="border bg-white p-2 space-y-4">
        <div>
          <p>From:</p>
          <input type="datetime-local" id="from-time" ref={fromTimeRef} />
          <p>To:</p>
          <input type="datetime-local" id="to-time" ref={toTimeRef} />
        </div>
        <NavButton disabled={isLoading} onClick={download}>
          DOWNLOAD
        </NavButton>
        {error && (
          <div className="border p-2 text-red-800 bg-rose-100">
            <p className="font-bold">Failed to download data:</p>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
