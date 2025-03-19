import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";

interface SortIconProps {
  onSort: (direction: "asc" | "desc") => void;
  className?: string;
  initialSortDirection?: "asc" | "desc";
  label: string;
  align?: "left" | "center"; // <-- New optional prop for alignment
}

const SortIcon: React.FC<SortIconProps> = ({
  onSort,
  className = "",
  initialSortDirection = "asc",
  label,
  align = "center", // Default alignment is center if not specified
}) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(initialSortDirection);

  const handleSort = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    onSort(newDirection);
  };

  // Alignment handling classes
  const alignmentClass =
    align === "left"
      ? "justify-start text-left"
      : "justify-center text-center";

  return (
    <button
      onClick={handleSort}
      className={`flex items-center gap-1 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-all w-full ${alignmentClass} ${className}`}
      aria-label={`Sort by ${label}`}
    >
      <span className="font-medium">{label}</span>
      <ArrowUpDown
        className={`transition-transform duration-300 ${
          sortDirection === "asc" ? "rotate-180 text-blue-500" : "rotate-0 text-blue-500"
        }`}
        size={20}
        strokeWidth={2}
      />
    </button>
  );
};

export default SortIcon;
