import { TableCell, TableRow } from "@/components/ui/table";

export default function SkeletonLoader({ isMobile = false }: { isMobile?: boolean }) {
  if (isMobile) {
    return (
      <div className="p-5 border rounded-lg shadow-sm bg-white">
        <div className="w-3/4 h-5 bg-gray-300 animate-pulse rounded-md mb-2"></div>
        <div className="w-1/2 h-5 bg-gray-300 animate-pulse rounded-md mb-2"></div>
        <div className="w-full h-5 bg-gray-300 animate-pulse rounded-md mb-2"></div>
        <div className="flex justify-end gap-4 mt-3">
          <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <TableRow className="h-12">
      {Array(5).fill(null).map((_, index) => (
        <TableCell key={index}>
          <div className="w-full h-5 bg-gray-300 animate-pulse rounded-md"></div>
        </TableCell>
      ))}
      <TableCell className="text-right">
        <div className="flex items-center gap-x-2 justify-end w-full">
          <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      </TableCell>
    </TableRow>
  );
}
