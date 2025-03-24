import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(searchTerm); // Local input state for debouncing

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue.length >= 3 || inputValue.length === 0) {
        // Only update searchTerm if 3+ characters OR input is cleared
        setSearchTerm(inputValue);
      }
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler); // Clear previous timeout if inputValue changes
    };
  }, [inputValue, setSearchTerm]);

  return (
    <div className="w-full max-w-lg px-2">
      <div className="relative group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search..."
          className={`
            w-full py-2.5 px-4 pl-10 
            bg-transparent 
            border-2 
            ${isFocused
              ? "border-blue-500 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)]"
              : "border-gray-700 text-gray-400"}
            rounded-full 
            transition-all duration-300
            focus:outline-none
          `}
        />
        <Search
          className={`
            absolute left-3 top-1/2 -translate-y-1/2
            ${isFocused
              ? "text-blue-500 scale-110"
              : "text-gray-600"}
            transition-all duration-300
          `}
          size={18}
        />
      </div>
    </div>
  );
};

export default SearchBar;
