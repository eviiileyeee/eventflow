import React from "react";
const InputField = ({ 
    label, 
    type = "text", 
    placeholder, 
    required, 
    maxLength, 
    icon, 
    value, 
    onChange, 
    name, 
    min, 
    step,
    darkMode 
  }) => {
    return (
      <div>
        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={`w-full px-3 py-2 border ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
            } rounded-md focus:ring-purple-500 focus:border-purple-500 ${
              icon ? 'pl-10' : ''
            }`}
            placeholder={placeholder}
            required={required}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            name={name}
            min={min}
            step={step}
          />
        </div>
      </div>
    );
  };

  export default InputField;