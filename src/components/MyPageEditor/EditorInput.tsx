import React from 'react';

type FormInputProps = {
  label: string;
  value: string;
  placeholder: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  placeholder,
  readOnly = false,
  onChange,
  type = 'text',
}) => (
  <div className="flex items-center mb-4">
    <label className="w-24 text-gray-700 font-medium">{label}</label>
    <div className="flex-1">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="w-[375px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  </div>
);

export default FormInput;
