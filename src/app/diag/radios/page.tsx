import { CellStatus } from "@/components/cell-status";
import { GNSSStatus } from "@/components/gnss-status";
import { GNSSVehicles } from "@/components/gnss-vehicles";

export default function RadiosPage() {
  return (
    <div className="flex flex-col h-full">
      <title>GNSS Information</title>
      <p className="text-xl font-bold">GNSS Information</p>

      <div className="flex gap-2">
        <GNSSStatus />
        <GNSSVehicles />
      </div>
      <p className="text-xl font-bold mt-4">Wireless Information</p>
      <div className="flex gap-2">
        <CellStatus />
      </div>
    </div>
  );
}
