import { format } from "date-fns";

export const formatDate = (date: string | Date | null) => {
  return date ? format(new Date(date), "dd MMM yyyy") : "N/A";
};
