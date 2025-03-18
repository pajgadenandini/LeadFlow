import { SignUpFormData } from "../types/signup.types";
import { LogInFormData } from "../types/login.types";

export const validateSignupForm = (formData: SignUpFormData, setErrors: any) => {
  let valid = true;
  const newErrors = {
    name: '',
    email: '',
    password: '',
  };

  // Name validation
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
    valid = false;
  }

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid';
    valid = false;
  }

  // Password validation
  if (!formData.password) {
    newErrors.password = 'Password is required';
    valid = false;
  } else if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};


export const validateLoginForm = (formData: LogInFormData, setErrors: any) => {
  let valid = true;
  const newErrors = {
    email: '',
    password: '',
  };

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid';
    valid = false;
  }

  // Password validation
  if (!formData.password) {
    newErrors.password = 'Password is required';
    valid = false;
  } else if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};