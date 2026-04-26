import { LogTable } from "@/components/log-table";

export default function LogsPage() {
  return (
    <div className="flex flex-col h-full">
      <title>Log Viewer</title>
      <p className="text-xl font-bold">Log Viewer</p>
      <LogTable />
    </div>
  );
}
