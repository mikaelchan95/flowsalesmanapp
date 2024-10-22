import React from 'react';
import { User, MapPin, Hash, Phone, Mail, Building } from 'lucide-react';
import { CustomerInfoProps } from '../types';

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer, className }) => (
  <div className={`card ${className}`}>
    <div className="card-body">
      <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center">
          <User className="mr-2 text-black" />
          <span>{customer.name}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 text-black" />
          <span>{customer.address}</span>
        </div>
        <div className="flex items-center">
          <Hash className="mr-2 text-black" />
          <span>UEN: {customer.uenNo}</span>
        </div>
        <div className="flex items-center">
          <Phone className="mr-2 text-black" />
          <a href={`tel:${customer.phoneNumber}`} className="text-blue-600 hover:underline">
            {customer.phoneNumber || 'N/A'}
          </a>
        </div>
        <div className="flex items-center">
          <Mail className="mr-2 text-black" />
          <a href={`mailto:${customer.email}`} className="text-blue-600 hover:underline">
            {customer.email || 'N/A'}
          </a>
        </div>
        <div className="flex items-center">
          <Building className="mr-2 text-black" />
          <span>Billing Entity: {customer.billingEntity}</span>
        </div>
        <div className="flex items-center">
          <User className="mr-2 text-black" />
          <span>Payer: {customer.payer}</span>
        </div>
      </div>
    </div>
  </div>
);

export default CustomerInfo;