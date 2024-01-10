import React from "react";

type CustomInputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  necessary?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: boolean;
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  type,
  value,
  necessary,
  onChange,
  className,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font mb-2">
        {label}: {necessary && <span className="text-red-700">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`shadow appearance-none border rounded-md w-full py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none ${
          error ? "border-red-500" : " focus:border-indigo-500"
        } ${className}`}
      />
      {error && (
        <p className="text-red-500 text-xs italic">This field is required.</p>
      )}
    </div>
  );
};

export default CustomInput;
