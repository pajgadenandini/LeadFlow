import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { validateForm } from "../utils/validation";
import { toast } from "react-hot-toast";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getAuthHeaders } from "@/context/AuthContext";

const NewLeadForm = () => {
  const [formData, setFormData] = useState({
    leadName: "",
    email: "",
    phone: "",
    website: "",
    source: "",
    otherSource: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Map frontend field names to the backend field names
      const leadData = {
        clientName: formData.leadName,
        clientEmail: formData.email,
        contactNo: formData.phone,
        urlLink: formData.website,
        source:
          formData.source === "other" ? formData.otherSource : formData.source,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_BASE_URL}/leads`,
        leadData,
        {headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );

      // console.log("new lead axios ",response)

      if (response.status === 201) {
        toast.success("New lead added successfully!", {
          duration: 5000,
        });

        setTimeout(() => {
          navigate("/dashboard");
        });
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors({ general: error.response.data.errors.join(", ") });
      } else {
        setErrors({
          general:
            error.response?.data?.error ||
            "Something went wrong. Please try again.",
        });
      }

      toast.error("Failed to add lead", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Add New Lead
        </h2>
        {errors.general && (
          <p className="text-red-500 mb-4">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Lead Name */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Lead Name</label>
            <input
              type="text"
              name="leadName"
              value={formData.leadName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter lead name"
              required
            />
            {errors.leadName && (
              <p className="text-red-500">{errors.leadName}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter email"
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">
              Phone Number
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter phone number"
              required
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>

          {/* Website */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter website URL"
              required
            />
            {errors.website && <p className="text-red-500">{errors.website}</p>}
          </div>

          {/* Source */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium">Source</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select source</option>
              <option value="referral">Referral</option>
              <option value="social_media">Social Media</option>
              <option value="website">Website</option>
              <option value="email">Email Campaign</option>
              <option value="other">Other</option>
            </select>
            {errors.source && <p className="text-red-500">{errors.source}</p>}
          </div>

          {/* Other Source (Visible only if "Other" is selected) */}
          {formData.source === "other" && (
            <div className="mb-4">
              <label className="block text-gray-600 font-medium">
                Other Source
              </label>
              <input
                type="text"
                name="otherSource"
                value={formData.otherSource}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter other source"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Lead"}
          </button>
        </form>
      </div>
      < Footer />
    </div>
  );
};

export default NewLeadForm;
