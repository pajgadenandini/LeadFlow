import { useMediaQuery } from "@/hooks/useMediaQuery";
import DesktopTableView from "./DesktopTableView";
import MobileCardView from "./MobileCardView";
import { ILead } from "@/types/lead.types";

interface DataTableProps {
  data: ILead[];
  onDelete: (id: number) => void;
  onSortChange: (field: string, direction: string) => void;
  onStatusFilterChange?: (status: string) => void;
  sortBy: string;
  sortOrder: "asc" | "desc";
  loading: boolean;
}

export default function DataTable(props: DataTableProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="md:h-1/2 overflow-hidden relative">
      {isMobile ? (
        <MobileCardView
          {...props}
        />
      ) : (
        <DesktopTableView {...props} />
      )}
    </div>
  );
}
