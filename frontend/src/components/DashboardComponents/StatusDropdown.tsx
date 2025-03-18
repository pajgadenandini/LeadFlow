import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface StatusDropdownProps {
  onSelect?: (status: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ onSelect = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

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

  return (
    <div className="relative w-full max-w-[150px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-all w-full text-left"
        aria-label="Filter by Status"
      >
        <span className="font-medium truncate">{selectedStatus ? statusOptions.find(option => option.value === selectedStatus)?.label : "Status"}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-500" : "rotate-0 text-blue-500"}`}
          size={20}
          strokeWidth={2}
        />
      </button>

      {isOpen && (
        <div
          className="absolute z-10 w-full bg-white border border-gray-300 
                     rounded-md shadow-lg mt-1 py-1 max-h-60 overflow-y-auto 
                     transition-all duration-300 origin-top scale-y-100 opacity-100"
        >
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              className={`w-full flex items-center px-3 py-1 text-sm text-left 
                          transition-colors duration-200 ${
                            selectedStatus === option.value ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
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
