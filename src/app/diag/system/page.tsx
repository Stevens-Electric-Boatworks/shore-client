import { ServerSystemInformation } from "@/components/server-sys-info";

export default function SystemsDiagPage() {
  return (
    <div>
      <p className="font-bold text-2xl">System Information</p>
      <p className="my-2 font-bold">Server</p>
      <ServerSystemInformation />
      <p>Boat</p>
    </div>
  );
}
