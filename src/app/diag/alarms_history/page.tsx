"use client";

import { AlarmsHistoryTable } from "@/components/alarms-history-table";

export default function AlarmsPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <title>Alarms History</title>
      <h1 className="font-bold text-2xl">Alarms History</h1>
      <AlarmsHistoryTable />
    </div>
  );
}
