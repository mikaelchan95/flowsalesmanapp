import React, { useState } from 'react';
import { Book, HelpCircle, Mail, Phone, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpSupportPage: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    { id: 1, question: "How do I create a new sales order?", answer: "To create a new sales order, navigate to the 'New Order' page from the main menu. Fill in the customer details, add products, and submit the order." },
    { id: 2, question: "Can I edit a customer's information?", answer: "Yes, you can edit a customer's information. Go to the 'Customers' page, find the customer, and click on 'Edit' to modify their details." },
    { id: 3, question: "How do I track my sales performance?", answer: "Your sales performance can be tracked on the Dashboard. It displays key metrics such as total sales, outstanding balance, and performance indicators." },
    { id: 4, question: "What should I do if I forget my password?", answer: "If you forget your password, click on the 'Forgot Password' link on the login page. Follow the instructions sent to your email to reset your password." },
    { id: 5, question: "How often is the product catalog updated?", answer: "The product catalog is updated in real-time. Any changes made to the inventory are immediately reflected in the system." },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <HelpCircle className="mr-2" size={24} />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border-b pb-2">
                <button
                  className="flex justify-between items-center w-full text-left font-medium"
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <span>{expandedFAQ === faq.id ? '−' : '+'}</span>
                </button>
                {expandedFAQ === faq.id && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Book className="mr-2" size={24} />
              Tutorials & Resources
            </h2>
            <ul className="space-y-2">
              <li>
                <Link to="/tutorial/getting-started" className="text-blue-600 hover:underline flex items-center">
                  <ExternalLink size={16} className="mr-2" />
                  Getting Started Guide
                </Link>
              </li>
              <li>
                <Link to="/tutorial/sales-order" className="text-blue-600 hover:underline flex items-center">
                  <ExternalLink size={16} className="mr-2" />
                  Creating a Sales Order
                </Link>
              </li>
              <li>
                <Link to="/tutorial/customer-management" className="text-blue-600 hover:underline flex items-center">
                  <ExternalLink size={16} className="mr-2" />
                  Customer Management
                </Link>
              </li>
              <li>
                <Link to="/tutorial/reporting" className="text-blue-600 hover:underline flex items-center">
                  <ExternalLink size={16} className="mr-2" />
                  Generating Reports
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
            <div className="space-y-4">
              <p className="flex items-center">
                <Mail className="mr-2" size={20} />
                <a href="mailto:support@epicowine.com" className="text-blue-600 hover:underline">support@epicowine.com</a>
              </p>
              <p className="flex items-center">
                <Phone className="mr-2" size={20} />
                <a href="tel:+6567123456" className="text-blue-600 hover:underline">+65 6712 3456</a>
              </p>
              <p className="flex items-center">
                <MessageSquare className="mr-2" size={20} />
                <a href="#" className="text-blue-600 hover:underline">Live Chat (9am - 6pm SGT)</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportPage;