import { useState, useEffect, useCallback, useRef } from "react";
import { ILead, LeadFilters } from "../types/lead.types";
import { fetchLeadsApi } from "../services/leadService";

export default function useLeads(
  page: number,
  searchTerm: string,
  sortBy: string = "updatedAt",
  sortOrder: "asc" | "desc" = "desc",
  filters: LeadFilters,
  append: boolean = false // Appending for infinite scroll
) {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const prevSearchTerm = useRef<string>("");
  const prevFilters = useRef<LeadFilters>({});

  const isSearchOrFilterActive = searchTerm.trim() !== "" || Object.keys(filters).length > 0;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Delay for lazy loading animation
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const data = await fetchLeadsApi(page, searchTerm, sortBy, sortOrder, filters);

      await new Promise((resolve) => setTimeout(resolve, 350)); // Additional smooth loading delay

      setTotalPages(data.totalPages);

      // append === false: reset leads to new fetched data
      if (!append) {
        setLeads(data.leads);
      } else {
        // append === true: infinite scroll behavior
        // CASE 1: Search/filter is active
        if (isSearchOrFilterActive) {
          // If search/filter just changed, reset leads
          const searchChanged = prevSearchTerm.current !== searchTerm;
          const filterChanged = JSON.stringify(prevFilters.current) !== JSON.stringify(filters);

          if (searchChanged || filterChanged || page === 1) {
            setLeads(data.leads);
          } else {
            setLeads((prevLeads) => [...prevLeads, ...data.leads]);
          }

          // Update previous values for next comparison
          prevSearchTerm.current = searchTerm;
          prevFilters.current = filters;

        } else {
          // CASE 2: No search/filter is active
          const wasSearchActive = prevSearchTerm.current !== "" || Object.keys(prevFilters.current).length > 0;

          if (wasSearchActive || page === 1) {
            // If search/filter just cleared OR it's the first page
            setLeads(data.leads);
          } else {
            setLeads((prevLeads) => [...prevLeads, ...data.leads]);
          }

          // Reset previous search/filter refs
          prevSearchTerm.current = "";
          prevFilters.current = {};
        }
      }

    } catch (error) {
      setError("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, sortBy, sortOrder, filters, append, isSearchOrFilterActive]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return { leads, loading, error, totalPages, refetch: fetchLeads };
}
