import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface StatusDropdownProps {
  onSelect?: (status: string) => void;
  placeholder?: string;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  onSelect = () => {},
  placeholder = "Status",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions = [
    { value: "", label: "All" },
    { value: "new", label: "New" },
    { value: "engaging", label: "Engaging" },
    { value: "proposal", label: "Proposal" },
    { value: "closed win", label: "Closed Win" },
    { value: "closed missed", label: "Closed Missed" },
  ];

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setIsOpen(false);
    onSelect(status);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full max-w-[200px]">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-center items-center gap-2 cursor-pointer p-2 rounded-md 
                   hover:bg-gray-200 transition-all w-full"
        aria-label="Filter by Status"
      >
        <div className="flex items-center gap-1">
          <span className="font-medium truncate">
            {selectedStatus
              ? statusOptions.find((option) => option.value === selectedStatus)?.label
              : placeholder}
          </span>
          <ChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180 text-blue-500" : "rotate-0 text-blue-500"
            }`}
            size={20}
            strokeWidth={2}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 w-full bg-white border border-gray-300 
                     rounded-md shadow-lg mt-1 py-1 max-h-60 overflow-y-auto 
                     transition-all duration-200 origin-top scale-y-100 opacity-100"
        >
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              className={`w-full flex items-center px-3 py-2 text-sm justify-start
                          transition-colors duration-200 ${
                            selectedStatus === option.value
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "hover:bg-gray-100"
                          }`}
            >
              {option.label}
              {selectedStatus === option.value && (
                <Check className="ml-auto h-4 w-4 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
