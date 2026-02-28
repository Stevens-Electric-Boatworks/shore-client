import { GNSSInfo } from "@/components/gnss-info";

export default function GNSSPage() {
  return (
    <div className="flex flex-col h-full">
      <title>GNSS Information</title>
      <p className="text-xl font-bold">GNSS Information</p>

      <GNSSInfo />
    </div>
  );
}
