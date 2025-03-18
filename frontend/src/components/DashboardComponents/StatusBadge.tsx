import clsx from "clsx";

interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, { color: string; bgColor: string }> = {
  new: {
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  engaging: {
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  proposal: {
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  "closed win": {
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  "closed missed": {
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace("-", " ");
  const styles = statusStyles[normalizedStatus] || {
    color: "text-gray-600",
    bgColor: "bg-gray-50",
  };

  return (
    <span className={clsx("px-2 py-1 rounded-md text-xs font-medium", styles.color, styles.bgColor)}>
      {status}
    </span>
  );
}