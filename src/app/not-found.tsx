"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const [timer, setTimer] = useState(6);
  const router = useRouter();

  useEffect(() => {
    if (timer === 0) {
      router.replace("/");
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, router]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="bg-red-200 border p-2">
        <p className="font-bold">Page Not Found</p>
        <p>This page does not exist.</p>
        <p>Redirecting to MAIN in ({timer})...</p>
      </div>
    </div>
  );
}
