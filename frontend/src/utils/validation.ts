export const validateForm = (formData: {
  leadName: string;
  email: string;
  phone: string;
  website: string;
  source: string;
  otherSource?: string;
}) => {
  const errors: { [key: string]: string } = {};

  // Validate leadName (clientName in backend)
  if (!formData.leadName.trim()) {
    errors.leadName = "Lead name is required";
  }

  // Validate email (clientEmail in backend)
  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  // Validate phone (contactNo in backend)
  if (!formData.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^\d{10}$/.test(formData.phone)) {
    errors.phone = "Phone number must be 10 digits";
  }

  // Validate website (urlLink in backend)
  if (!formData.website) {
    errors.website = "Website URL is required";
  } else if (!/^https?:\/\/.+$/.test(formData.website)) {
    errors.website = "Invalid URL format. Must start with http:// or https://";
  }

  // Validate source
  if (!formData.source) {
    errors.source = "Source is required";
  } else if (formData.source === "other" && !formData.otherSource?.trim()) {
    errors.otherSource = "Please specify the source";
  }

  return errors;
};