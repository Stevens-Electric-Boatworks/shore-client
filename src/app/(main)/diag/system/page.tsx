import { BoatSystemInformation } from "@/components/boat-sys-info";
import { ServerSystemInformation } from "@/components/server-sys-info";

export default function SystemsDiagPage() {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-2xl">System Information</p>
      <ServerSystemInformation />
      <BoatSystemInformation />
    </div>
  );
}
