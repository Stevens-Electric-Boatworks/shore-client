"use client";

import { AlarmsTable } from "@/components/alarms-table";

export default function AlarmsPage() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <h1 className="font-bold text-2xl">Active Alarms List</h1>
      <AlarmsTable />
    </div>
  );
}
