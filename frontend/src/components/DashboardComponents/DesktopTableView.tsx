import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import SortIcon from "./SortIcon";
  import StatusBadge from "./StatusBadge";
  import SkeletonLoader from "./SkeletonLoader";
  import DetailsPageButton from "./DetailsPageButton";
  import MinimalistDeleteButton from "./MinimalistDeleteButton";
  import StatusDropdown from "./StatusDropdown";
  import { formatDate } from "@/utils/formatters";
  import { ILead } from "@/types/lead.types";
  import { useNavigate } from "react-router-dom";
  
  interface DesktopTableViewProps {
    data: ILead[];
    loading: boolean;
    onDelete: (id: number) => void;
    onSortChange: (field: string, direction: string) => void;
    onStatusFilterChange?: (status: string) => void;
    sortBy: string;
    sortOrder: "asc" | "desc";
  }
  
  export default function DesktopTableView({
    data,
    loading,
    onDelete,
    onSortChange,
    onStatusFilterChange,
    sortBy,
    sortOrder,
  }: DesktopTableViewProps) {
    const navigate = useNavigate();
  
    console.log(data);
  
    return (
      <div className="hidden md:block overflow-y-auto overflow-x-auto transition-all duration-500 ease-in-out">
        <Table className="w-full border table-fixed min-w-[950px]">
          <TableHeader>
            <TableRow>
              {[
                { key: "clientName", label: "Client Name", width: "w-[18%]", align: "text-left" },
                { key: "clientEmail", label: "Email", width: "w-[24%]", align: "text-left" },
                { key: "createdAt", label: "Created Date", width: "w-[15%]", align: "text-center" },
                { key: "updatedAt", label: "Last Activity", width: "w-[14%]", align: "text-center" },
                { key: "currentStatus", label: "Status", width: "w-[14%]", align: "text-center" },
              ].map(({ key, label, width, align }) => (
                <TableHead key={key} className={`${align} align-middle px-4 py-2 ${width}`}>
                  {key === "currentStatus" ? (
                    <div className="flex justify-center items-center">
                      <StatusDropdown onSelect={onStatusFilterChange} />
                    </div>
                  ) : (
                    <SortIcon
                      onSort={(direction) => onSortChange(key, direction)}
                      initialSortDirection={sortBy === key ? sortOrder : "asc"}
                      label={label}
                      align={align.includes("center") ? "center" : "left"}
                    />
                  )}
                </TableHead>
              ))}
  
              {/* Actions column with updated width */}
              <TableHead className="text-center align-middle px-4 py-2 w-[15%]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {loading
              ? Array(10)
                  .fill(null)
                  .map((_, index) => <SkeletonLoader key={index} />)
              : data.length > 0
              ? data.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="truncate text-left px-4 py-3 w-[18%] md:pl-6">
                      {lead.clientName}
                    </TableCell>
                    <TableCell className="truncate text-left px-4 py-3 w-[24%]">
                      {lead.clientEmail}
                    </TableCell>
                    <TableCell className="text-center px-4 py-3 w-[15%]">
                      {formatDate(lead.createdAt)}
                    </TableCell>
                    <TableCell className="text-center px-4 py-3 w-[14%]">
                      {formatDate(lead.updatedAt)}
                    </TableCell>
                    <TableCell className="text-center px-4 py-3 w-[14%]">
                      <StatusBadge status={lead.currentStatus} />
                    </TableCell>
  
                    {/* Actions: Details & Delete buttons in a flex container */}
                    <TableCell className="text-center px-4 py-3 w-[15%]">
                      <div className="flex justify-center items-center gap-2">
                        <DetailsPageButton
                          onClick={() => navigate(`/leads/${lead.id}`)}
                        />
                        <MinimalistDeleteButton
                          onDelete={() => onDelete(lead.id)}
                          className="w-6 h-6"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500 px-4 py-6">
                    No records present
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
    );
  }
  