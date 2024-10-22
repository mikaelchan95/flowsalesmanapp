import React, { useState } from 'react';
import { Book, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Tutorial {
  id: number;
  title: string;
  content: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const tutorials: Tutorial[] = [
  { id: 1, title: "Getting Started with FLOW Salesman", content: "This tutorial will guide you through the basics of using the FLOW Salesman application..." },
  { id: 2, title: "Creating a New Sales Order", content: "Learn how to create a new sales order efficiently..." },
  { id: 3, title: "Managing Customer Profiles", content: "Discover how to effectively manage and update customer profiles..." },
];

const faqs: FAQ[] = [
  { id: 1, question: "How do I reset my password?", answer: "To reset your password, go to the login page and click on the 'Forgot Password' link..." },
  { id: 2, question: "Can I customize the dashboard?", answer: "Currently, the dashboard is not customizable. However, we're working on adding this feature in a future update..." },
  { id: 3, question: "How often is the inventory updated?", answer: "The inventory is updated in real-time as orders are processed and new stock is added..." },
];

const TrainingSupport: React.FC = () => {
  const [expandedTutorial, setExpandedTutorial] = useState<number | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Training & Support</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Book className="mr-2" size={24} />
          Tutorials
        </h3>
        <div className="space-y-4">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="border border-gray-200 rounded-md">
              <button
                className="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setExpandedTutorial(expandedTutorial === tutorial.id ? null : tutorial.id)}
              >
                <span className="font-medium">{tutorial.title}</span>
                {expandedTutorial === tutorial.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedTutorial === tutorial.id && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  {tutorial.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <HelpCircle className="mr-2" size={24} />
          FAQs
        </h3>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-md">
              <button
                className="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
              >
                <span className="font-medium">{faq.question}</span>
                {expandedFAQ === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedFAQ === faq.id && (
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingSupport;