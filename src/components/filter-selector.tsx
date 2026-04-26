import { cn } from "@/lib/cn";
import { LOG_FILTERS } from "@/lib/filters";
import { Filter } from "lucide-react";
import { useState } from "react";

interface Props {
  activeFilters: Set<string>;
  onToggle: (name: string) => void;
  onReset: () => void;
}

export const FilterSelector = ({ activeFilters, onToggle, onReset }: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative ml-auto">
      <button
        className={cn(
          "flex items-center justify-center w-6 h-6 bg-blue-600 border border-t-blue-400 border-l-blue-400 border-b-blue-700 border-r-blue-700 hover:bg-blue-700 hover:cursor-pointer",
          visible && "bg-blue-700",
        )}
        onClick={() => setVisible((s) => !s)}
      >
        <Filter className="w-4 h-4 text-white" />
      </button>
      <div
        className={cn(
          "bg-white border p-2 -right-2 absolute max-h-200 w-80 overflow-auto",
          !visible && "hidden",
        )}
      >
        <div className="flex">
          <p className="font-bold text-lg">Filters</p>
        </div>
        {LOG_FILTERS.map((filter) => (
          <div key={filter.name} className="flex gap-2">
            <input
              id={filter.name}
              type="checkbox"
              checked={activeFilters.has(filter.name)}
              onChange={() => onToggle(filter.name)}
            />
            <label htmlFor={filter.name}>{filter.label}</label>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            className="text-black/70 hover:text-black hover:cursor-pointer hover:underline"
            onClick={onReset}
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};
