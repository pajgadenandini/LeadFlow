import {useNavigate} from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import {ILead} from "@/types/lead.types";
import {formatDate} from "@/utils/formatters";
import SortIcon from "./SortIcon";
import SkeletonLoader from "./SkeletonLoader";
import MinimalistDeleteButton from "./MinimalistDeleteButton";
import DetailsPageButton from "./DetailsPageButton";
import StatusDropdown from "./StatusDropdown"; // Import the new component

interface DataTableProps {
    data: ILead[];
    onDelete: (id : number) => void;
    onSortChange: (field : string, direction : string) => void;
    onStatusFilterChange?: (status: string) => void; // New prop
    sortBy: string;
    sortOrder: "asc" | "desc";
    loading: boolean;
}

export default function DataTable({
    data,
    onDelete,
    onSortChange,
    onStatusFilterChange,
    sortBy,
    sortOrder,
    loading
} : DataTableProps) {
    const navigate = useNavigate();

    return (
        <div className="md:h-1/2 overflow-hidden relative">
            {/* Table for larger screens */}
            <div className="hidden md:block overflow-y-auto overflow-x-auto transition-all duration-500 ease-in-out">
                <Table className="w-full border table-fixed min-w-[850px]">
                    <TableHeader>
                        <TableRow>
                            {
                                [
                                    {
                                        key: "clientName",
                                        label: "Client Name",
                                        width: "w-1/6"
                                    }, 
                                    {
                                        key: "clientEmail",
                                        label: "Email",
                                        width: "w-1/5"
                                    }, 
                                    {
                                        key: "createdAt",
                                        label: "Created Date",
                                        width: "w-1/6"
                                    }, 
                                    {
                                        key: "updatedAt",
                                        label: "Last Activity",
                                        width: "w-1/6"
                                    }, 
                                    {
                                        key: "currentStatus",
                                        label: "Status",
                                        width: "w-[18%]"
                                    }
                                ].map(({key, label, width}) => (
                                    <TableHead key={key} className={`text-left ${width}`}>
                                        {key === 'currentStatus' ? (
                                                <StatusDropdown 
                                                    onSelect={onStatusFilterChange}
                                                />
                                        ) : (
                                            <SortIcon
                                                onSort={(direction) => onSortChange(key, direction)}
                                                initialSortDirection={sortBy === key
                                                    ? sortOrder
                                                    : "asc"}
                                                label={label}
                                            />
                                        )}
                                    </TableHead>
                                ))
                            }
                            <TableHead className="text-left w-[14%]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            loading
                                ? (Array(10).fill(null).map((_, index) => <SkeletonLoader key={index}/>))
                                : data.length > 0
                                    ? (data.map((lead) => (
                                        <TableRow key={lead.id}>
                                            <TableCell className="truncate w-1/6">{lead.clientName}</TableCell>
                                            <TableCell className="truncate w-1/5">{lead.clientEmail}</TableCell>
                                            <TableCell className="w-1/6">{formatDate(lead.createdAt)}</TableCell>
                                            <TableCell className="w-1/6">{formatDate(lead.updatedAt)}</TableCell>
                                            <TableCell className="w-[18%]">
                                                <StatusBadge status={lead.currentStatus}/>
                                            </TableCell>
                                            <TableCell className="w-[14%] text-center">
                                                <div className="flex items-center gap-x-2 justify-start w-full">
                                                    <DetailsPageButton onClick={() => navigate(`/leads/${lead.id}`)}/>
                                                    <MinimalistDeleteButton onDelete={() => onDelete(lead.id)} className="w-6 h-6"/>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )))
                                    : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-gray-500">
                                                No records present
                                            </TableCell>
                                        </TableRow>
                                    )
                        }
                    </TableBody>
                </Table>
            </div>

            {/* Cards for mobile screens */}
            <div className="md:hidden space-y-5">
            {loading
  ? (Array(10).fill(null).map((_, index) => <SkeletonLoader key={index} isMobile />))
  : data.length > 0
                            ? (data.map((lead) => (
                                <div key={lead.id} className="p-5 border rounded-lg shadow-md bg-white">
                                    {/* Header Section */}
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-lg font-semibold">{lead.clientName}</p>
                                            <p className="text-lg text-gray-600">{lead.clientEmail}</p>
                                        </div>
                                        <StatusBadge status={lead.currentStatus}/>
                                    </div>

                                    {/* Date Information */}
                                    <div className="mt-3 text-lg text-gray-600">
                                        <p>
                                            <strong>Created:
                                            </strong>
                                            {formatDate(lead.createdAt)}</p>
                                        <p>
                                            <strong>Last Activity:
                                            </strong>
                                            {formatDate(lead.updatedAt)}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-5 flex justify-end gap-4">
                                        <DetailsPageButton onClick={() => navigate(`/leads/${lead.id}`)}/>
                                        <MinimalistDeleteButton onDelete={() => onDelete(lead.id)} className="w-8 h-8"/>
                                    </div>
                                </div>
                            )))
                            : <div className="text-center text-lg text-gray-500 py-5">No records present</div>
}
            </div>

        </div>
    );
}