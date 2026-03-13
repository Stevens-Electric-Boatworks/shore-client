export const CellBars = ({ bars }: { bars: number }) => {
  return (
    <div className="flex items-end h-[16px] gap-0.5">
      <div
        className={`${bars >= 1 ? "bg-black" : "bg-black/35"} h-[30%] w-1 rounded-[1px]`}
      />
      <div
        className={`${bars >= 2 ? "bg-black" : "bg-black/35"} h-[50%] w-1 rounded-[1px]`}
      />
      <div
        className={`${bars >= 3 ? "bg-black" : "bg-black/35"} h-[70%] w-1 rounded-[1px]`}
      />
      <div
        className={`${bars >= 4 ? "bg-black" : "bg-black/35"} h-[90%] w-1 rounded-[1px]`}
      />
    </div>
  );
};
