import React from "react";
import { Mail, Lock, User } from "lucide-react";

interface TextInputProps {
  id: string;
  label:string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  error: string;
  icon: "mail" | "lock" | "user";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  name,
  type,
  value,
  placeholder,
  error,
  icon,
  onChange,
}) => {
  const IconComponent = icon === "mail" ? Mail : icon === "lock" ? Lock : User;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IconComponent size={18} className="text-gray-400" />
        </div>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`pl-10 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
            error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
          }`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextInput;