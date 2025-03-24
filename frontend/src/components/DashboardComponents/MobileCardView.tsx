import StatusBadge from "./StatusBadge";
import DetailsPageButton from "./DetailsPageButton";
import MinimalistDeleteButton from "./MinimalistDeleteButton";
import SkeletonLoader from "./SkeletonLoader";
import { formatDate } from "@/utils/formatters";
import { ILead } from "@/types/lead.types";
import { useNavigate } from "react-router-dom";

interface MobileCardViewProps {
  data: ILead[];
  loading: boolean;
  onDelete: (id: number) => void;
}

export default function MobileCardView({
  data,
  loading,
  onDelete,
}: MobileCardViewProps) {
  const navigate = useNavigate();
  console.log(data)
  return (
    <div className="md:hidden space-y-5">
      {loading
        ? Array(10)
            .fill(null)
            .map((_, index) => <SkeletonLoader key={index} isMobile />)
        : data.length > 0
        ? data.map((lead) => (
            <div key={lead.id} className="p-5 border rounded-lg shadow-md bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{lead.clientName}</p>
                  <p className="text-lg text-gray-600">{lead.clientEmail}</p>
                </div>
                <StatusBadge status={lead.currentStatus} />
              </div>

              <div className="mt-3 text-lg text-gray-600">
                <p>
                  <strong>Created:</strong> {formatDate(lead.createdAt)}
                </p>
                <p>
                  <strong>Last Activity:</strong> {formatDate(lead.updatedAt)}
                </p>
              </div>

              <div className="mt-5 flex justify-end gap-4">
                <DetailsPageButton onClick={() => navigate(`/leads/${lead.id}`)} />
                <MinimalistDeleteButton onDelete={() => onDelete(lead.id)} className="w-8 h-8" />
              </div>
            </div>
          ))
        : (
          <div className="text-center text-lg text-gray-500 py-5">
            No records present
          </div>
        )}
    </div>
  );
}
