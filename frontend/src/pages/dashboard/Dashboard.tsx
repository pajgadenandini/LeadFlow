import { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import DataTable from "../../components/DashboardComponents/DataTable";
import SearchBar from "../../components/DashboardComponents/SearchBar";
import Pagination from "../../components/DashboardComponents/Pagination";
import { ChatbotIcon } from "../../components/AiChatBot";
import { deleteLead } from "../../services/leadService";
import useLeads from "../../hooks/useLeads";
import FilterLeads from "../../components/DashboardComponents/FilterLeads";
import NewLeadButton from "@/components/DashboardComponents/NewLeadButton";
import DeleteConfirmationDialog from "../../components/DashboardComponents/DeleteConfirmationDialog";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const memoizedFilters = useMemo(
    () => ({ ...filters, status: statusFilter }),
    [filters, statusFilter]
  );

  const { leads, loading, error, totalPages, refetch } = useLeads(
    currentPage,
    searchTerm,
    sortBy,
    sortOrder,
    memoizedFilters
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  const handleSortChange = (field: string) => {
    setSortOrder((prevSortOrder) =>
      sortBy === field ? (prevSortOrder === "asc" ? "desc" : "asc") : "asc"
    );
    setSortBy(field);
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    if (deleteId !== null) {
      try {
        await deleteLead(deleteId);
        toast.success("Lead deleted successfully");
        refetch();
      } catch {
        toast.error("Failed to delete lead");
      } finally {
        setOpenConfirm(false);
        setDeleteId(null);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="w-full max-w-6xl mx-auto px-10 sm:px-16 md:px-0 lg:px-32 xl:px-10 py-4 flex flex-col flex-grow">

          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <h2
              className="pl-4 text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 
             bg-[length:200%_100%] animate-gradient 
             text-transparent bg-clip-text 
             transition-all duration-300 tracking-wide"
              aria-label="Lead Dashboard"
            >
              Lead Dashboard
            </h2>

            <NewLeadButton aria-label="Add new lead" />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full mb-6">
            <div className="flex flex-row items-center gap-2 w-full md:w-1/2">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} aria-label="Search leads" />
              <FilterLeads onApplyFilters={setFilters} onResetFilters={() => setFilters({})} aria-label="Filter leads" />
            </div>
          </div>


          <DataTable
            data={loading ? [] : leads}
            onDelete={confirmDelete}
            onSortChange={handleSortChange}
            sortBy={sortBy}
            sortOrder={sortOrder}
            loading={loading}
            onStatusFilterChange={setStatusFilter}
          />

          <div className="mt-4 flex justify-center w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              disabled={loading}
            />
          </div>

          {!loading && leads.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No records present
            </div>
          )}

          <ChatbotIcon />

          <DeleteConfirmationDialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            onConfirm={handleDeleteConfirmed}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
