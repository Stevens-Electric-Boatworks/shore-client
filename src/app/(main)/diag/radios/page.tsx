import { CellStatus } from "@/components/cell-status";
import { GNSSStatus } from "@/components/gnss-status";
import { GNSSVehicles } from "@/components/gnss-vehicles";

export default function RadiosPage() {
  return (
    <div className="flex flex-col h-full">
      <title>Radios</title>
      <p className="text-xl font-bold">Radios</p>

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
