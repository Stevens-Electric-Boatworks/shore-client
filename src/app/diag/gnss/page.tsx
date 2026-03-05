import { GNSSInfo } from "@/components/gnss-info";
import { GNSSStatus } from "@/components/gnss-status";
import { GNSSVehicles } from "@/components/gnss-vehicles";

export default function GNSSPage() {
  return (
    <div className="flex flex-col h-full">
      <title>GNSS Information</title>
      <p className="text-xl font-bold">GNSS Information</p>

      <div className="flex gap-2">
        <GNSSStatus />
        <GNSSVehicles />
      </div>
    </div>
  );
}
