export default function GNSSPage() {
  return (
    <div className="flex flex-col h-full">
      <title>GNSS Information</title>
      <p className="text-xl font-bold">GNSS Information</p>
      <div className="flex gap-2">
        <div className="border bg-white p-2 flex-2">
          <p className="font-bold">GENERAL</p>
        </div>
        <div className="border bg-white p-2 flex-1">
          <p className="font-bold">SATELLITES</p>
        </div>
      </div>
    </div>
  );
}
