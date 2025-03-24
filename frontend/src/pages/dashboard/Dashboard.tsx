import { useEffect, useState, useRef, useMemo } from "react";
import { toast } from "react-hot-toast";
import DataRenderer from "../../components/DashboardComponents/DataRenderer";
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

import Loader from "@/components/ui/Loader";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const observerRef = useRef<HTMLDivElement | null>(null); // Ref for the infinite scroll trigger

  // Detect if the screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const memoizedFilters = useMemo(
    () => ({ ...filters, status: statusFilter }),
    [filters, statusFilter]
  );

  // Fetch leads
  const { leads, loading, totalPages, refetch } = useLeads(
    currentPage,
    searchTerm,
    sortBy,
    sortOrder,
    memoizedFilters,
    isMobile // If mobile, append leads instead of replacing them
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  // Handle infinite scrolling
  useEffect(() => {
    if (!isMobile || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [isMobile, loading, currentPage, totalPages]);

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
            <h2 className="text-2xl font-semibold">Lead Dashboard</h2>
            <NewLeadButton />
          </div>
          <div className="flex flex-nowrap items-center gap-4 w-full mb-6">
            <div className="w-full max-w-[400px]">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <FilterLeads onApplyFilters={setFilters} onResetFilters={() => setFilters({})} aria-label="Filter leads" />
          </div>

          {/* Show infinite scroll for mobile, pagination for desktop */}
          <DataRenderer
            data={loading ? [] : leads}
            onDelete={confirmDelete}
            onSortChange={handleSortChange}
            sortBy={sortBy}
            sortOrder={sortOrder}
            loading={loading}
            onStatusFilterChange={setStatusFilter}
          />

          {!isMobile ? (
            <div className="mt-4 flex justify-center w-full">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} disabled={loading} />
            </div>
          ) : (
            <div ref={observerRef} className="h-10 w-full flex justify-center items-center">
              {loading && <Loader />}
            </div>
          )}

          {/* {!loading && leads.length === 0 && <div className="text-center text-gray-500 mt-4">No records present</div>} */}

          <ChatbotIcon />
          <DeleteConfirmationDialog open={openConfirm} onClose={() => setOpenConfirm(false)} onConfirm={handleDeleteConfirmed} />
        </div>
      </div>

      <Footer />
    </>
  );
}
