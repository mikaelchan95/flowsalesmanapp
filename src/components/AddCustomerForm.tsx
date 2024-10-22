import React, { useState } from 'react';

interface AddCustomerFormProps {
  onSubmit: (customer: any) => void;
  onCancel: () => void;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    registeredAddress: '',
    membershipLevel: 0,
    phoneNumber: '',
    contactAddress: '',
    uenNo: '',
    contactName: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'membershipLevel' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="card-body space-y-4">
        <FormField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
        <FormField label="Country" name="country" value={formData.country} onChange={handleChange} />
        <FormField label="Registered Address" name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} />
        <div>
          <label className="form-label" htmlFor="membershipLevel">Company Membership Level</label>
          <select
            className="form-input"
            id="membershipLevel"
            name="membershipLevel"
            value={formData.membershipLevel}
            onChange={handleChange}
            required
          >
            {[0, 1, 2, 3, 4, 5].map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <FormField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" />
        <FormField label="Contact Address" name="contactAddress" value={formData.contactAddress} onChange={handleChange} />
        <FormField label="UEN No." name="uenNo" value={formData.uenNo} onChange={handleChange} />
        <FormField label="Contact Name" name="contactName" value={formData.contactName} onChange={handleChange} />
        <FormField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
        <div className="flex items-center justify-between">
          <button className="btn btn-primary" type="submit">Add Customer</button>
          <button className="btn btn-secondary" type="button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </form>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="form-label" htmlFor={name}>{label}</label>
    <input
      className="form-input"
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default AddCustomerForm;