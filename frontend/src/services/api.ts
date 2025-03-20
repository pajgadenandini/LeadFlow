import { useAuth, getAuthHeaders } from "@/context/AuthContext";
import { Lead, Comment, LeadStatus, ILead } from "../types/lead.types";
import { LoginErrorResponse, LogInFormErrors } from "../types/login.types";
import { SignUpFormErrors } from "../types/signup.types";

// Base URL from environment variable
const BASE_URL =
  import.meta.env.VITE_APP_BACKEND_BASE_URL || "http://localhost:5000/api";

// Helper function to convert ILead (from backend) to Lead (frontend type)
const convertToLead = (backendLead: any): Lead => {
  return {
    id: backendLead.id.toString(),
    name: backendLead.clientName || "",
    email: backendLead.clientEmail || "",
    phone: backendLead.contactNo || "",
    website: backendLead.urlLink || "",
    source: backendLead.source || "",
    description: backendLead.description || "",
    currentStatus: (backendLead.currentStatus as LeadStatus) || "New",
    profileImage: backendLead.profileImage || undefined,
  };
};

// Helper function to convert backend comments to frontend Comment type
const convertToComments = (backendActivities: any[]): Comment[] => {
  if (!backendActivities || !Array.isArray(backendActivities)) {
    return [];
  }

  return backendActivities.map((activity) => ({
    id: activity.id.toString(),
    leadId: activity.leadId.toString(),
    userId: activity.userId.toString(),
    userName: activity.user ? activity.user.name : "Unknown User", // Assuming user is included in the response
    status: (activity.status as LeadStatus) || "New",
    text: activity.comment || "",
    timestamp: new Date(activity.timestamp || activity.createdAt).toISOString(),
  }));
};

export const api = {
  // GET API to fetch lead details
  fetchLeadDetails: async (leadId: string): Promise<Lead> => {
    // console.log('Fetching lead details for:', leadId);
    try {
      const response = await fetch(`${BASE_URL}/leadDetails/${leadId}`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch lead: ${response.statusText}`);
      }

      const data = await response.json();
      return convertToLead(data);
    } catch (error) {
      console.error("Error fetching lead details:", error);
      throw error;
    }
  },

  // PUT API to update lead status
  updateLeadStatus: async (
    leadId: string,
    newStatus: LeadStatus
  ): Promise<Lead> => {
    // console.log(`Updating lead ${leadId} status to ${newStatus}`);
    try {
      const response = await fetch(`${BASE_URL}/leadDetails/${leadId}/status`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update lead status: ${response.statusText}`);
      }

      const data = await response.json();
      return convertToLead(data);
    } catch (error) {
      console.error("Error updating lead status:", error);
      throw error;
    }
  },

  // GET API to fetch comments
  fetchComments: async (leadId: string): Promise<Comment[]> => {
    // console.log('Fetching comments for lead:', leadId);
    try {
      const response = await fetch(
        `${BASE_URL}/leadDetails/${leadId}/activities`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch comments: ${response.statusText}`);
      }

      const data = await response.json();
      return convertToComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Return empty array in case of error to prevent UI crashes
      return [];
    }
  },

  // POST API to add a new comment
  addComment: async (leadId: string, comment: Comment): Promise<Comment> => {
    // console.log('Adding comment for lead:', leadId, comment);
    try {
      const response = await fetch(`${BASE_URL}/activity/activities`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          leadId: leadId,
          userId: comment.userId,
          status: comment.status,
          comment: comment.text,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add comment: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        id: data.id.toString(),
        leadId: data.leadId.toString(),
        userId: data.userId.toString(),
        userName: comment.userName, // We use the provided userName since the API might not return it
        status: data.status as LeadStatus,
        text: data.comment || comment.text,
        timestamp: new Date(data.timestamp || data.createdAt).toISOString(),
      };
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },

  // User registration and login methods (unchanged)
  registerUser: async (
    name: string,
    email: string,
    password: string,
    setErrors: React.Dispatch<React.SetStateAction<SignUpFormErrors>>
  ): Promise<boolean> => {
    // console.log("Registering user:", { name, email });

    const payload = {
      name: name,
      email: email,
      password: password,
    };

    const newErrors = {
      name: "",
      email: "",
      password: "",
    };

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const user = await response.json();

      if (response.ok) {
        return true;
      } else {
        newErrors.email = user.error;
        setErrors(newErrors);
      }

      return false;
    } catch (error) {
      throw new Error(error);
    }
  },

  loginUser: async (
    email: string,
    password: string,
    setErrors: React.Dispatch<React.SetStateAction<LogInFormErrors>>,
    login: (token: string, user: any) => void
  ): Promise<LoginErrorResponse> => {
    // console.log("Logging user:", { email });

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      // console.log(response);

      const res = await response.json();

      if (response.ok) {
        const { user, token, ...data } = res;
        login(token, user);
        return data;
      } else {
        // clear if exist -- precaution purpose
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      return {
        success: false,
        message: res.error || "Login failed",
        type: "error",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.message || "An unexpected error occurred",
        type: "error",
      };
    }
  },
};
