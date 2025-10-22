"use client";
import { NavButton } from "@/components/ui/nav-button";
import axios, { isAxiosError } from "axios";
import { LineSpinner } from "ldrs/react";
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

      if (isNaN(fromDate.getTime())) {
        setError("Invalid from date.");
        return;
      }

      if (isNaN(toDate.getTime())) {
        setError("Invalid to date.");
        return;
      }

      if (fromDate.getTime() > toDate.getTime()) {
        setError("From date is after to date.");
        return;
      }

      const res = await axios.get(
        "https://shore.stevenseboat.org/api/download",
        {
          params: {
            from: fromDate.getTime(),
            to: toDate.getTime(),
          },
          responseType: "blob",
        }
      );

      let filename = "data.csv";
      try {
        filename = res.headers["Content-Disposition"]
          .split("filename=")[1]
          .split(";")[0]
          .replace(/"/g, "");
      } catch {}
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      if (isAxiosError(err)) {
        const blob = new Blob([err.response?.data], { type: "text/plain" });
        const res = JSON.parse(await blob.text());
        setError(res.error || "Unknown error.");
      } else {
        setError((err as Error).toString());
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
          <input
            type="datetime-local"
            id="from-time"
            ref={fromTimeRef}
            className="border px-2"
          />
          <p>To:</p>
          <input
            type="datetime-local"
            id="to-time"
            ref={toTimeRef}
            className="border px-2"
          />
        </div>
        <div className="flex gap-4 items-center">
          <NavButton disabled={isLoading} onClick={download}>
            DOWNLOAD
          </NavButton>
          {isLoading && <LineSpinner stroke={2} speed={1} size={24} />}
        </div>
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
