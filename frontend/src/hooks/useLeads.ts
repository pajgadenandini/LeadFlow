import { useState, useEffect, useCallback } from "react";
import { ILead, LeadFilters } from "../types/lead.types";
import { fetchLeadsApi } from "../services/leadService";

export default function useLeads(
  page: number,
  searchTerm: string,
  sortBy: string = "updatedAt",
  sortOrder: "asc" | "desc" = "desc",
  filters: LeadFilters
) {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);

    //introducing delay to show lazy loading animation
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const data = await fetchLeadsApi(page, searchTerm, sortBy, sortOrder, filters);
      setLeads(data.leads);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, sortBy, sortOrder, filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return { leads, loading, error, totalPages, refetch: fetchLeads };
}
