import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="form-label" htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="form-input"
      required
    />
  </div>
);

export default FormField;