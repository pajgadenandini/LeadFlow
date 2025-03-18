import { getAuthHeaders } from "@/context/AuthContext";
import { LeadApiResponse, LeadFilters } from "../types/lead.types";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/leads`;

export const fetchLeadsApi = async (
  page: number,
  search: string,
  sortBy: string,
  sortOrder: "asc" | "desc",
  filters: LeadFilters
): Promise<LeadApiResponse> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    search,
    sortBy,
    sortOrder,
    ...filters,
  });

  const response = await fetch(`${API_URL}?${queryParams.toString()}`,{
    method: "GET",
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }
  const data: LeadApiResponse = await response.json();
  return data;
};

export const deleteLead = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  if (!response.ok) {
    throw new Error("Failed to delete lead");
  }
};
