import React from 'react';
import { CustomerType } from '../../../data/types';

interface CustomerTypeSelectProps {
  value: CustomerType;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomerTypeSelect: React.FC<CustomerTypeSelectProps> = ({ value, onChange }) => (
  <div>
    <label className="form-label" htmlFor="type">Customer Type</label>
    <select
      id="type"
      name="type"
      value={value}
      onChange={onChange}
      className="form-input"
    >
      {Object.values(CustomerType).map(type => (
        <option key={type} value={type}>{type}</option>
      ))}
    </select>
  </div>
);

export default CustomerTypeSelect;