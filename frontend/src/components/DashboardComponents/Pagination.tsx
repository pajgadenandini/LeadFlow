import React from "react";
import { Button } from "@/components/ui/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, disabled }) => {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      <Button disabled={disabled || currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Previous
      </Button>
      <span className="px-4">{currentPage} / {totalPages}</span>
      <Button disabled={disabled || currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;