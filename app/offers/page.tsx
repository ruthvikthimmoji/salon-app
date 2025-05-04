'use client'
import React, { useState, useEffect } from 'react';

const customers = [
  { id: 1, name: 'John Doe', phone: '123-456-7890', email: 'john.doe@example.com', lastVisited: '2025-03-01' },
  { id: 2, name: 'Jane Smith', phone: '987-654-3210', email: 'jane.smith@example.com', lastVisited: '2025-02-20' },
  { id: 3, name: 'Bob Brown', phone: '555-123-4567', email: 'bob.brown@example.com', lastVisited: '2025-04-05' },
];

const SendOffersPage = () => {
  const [selectedCustomers, setSelectedCustomers] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  // Filter customers who visited more than 30 days ago
  useEffect(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const filtered = customers.filter(customer => {
      const lastVisitedDate = new Date(customer.lastVisited);
      return lastVisitedDate < thirtyDaysAgo;
    });

    setFilteredCustomers(filtered);
  }, []);

  const handleSelectCustomer = (customerId: number) => {
    setSelectedCustomers((prevState) =>
      prevState.includes(customerId)
        ? prevState.filter((id) => id !== customerId)
        : [...prevState, customerId]
    );
  };

  const handleSendMessage = () => {
    // Placeholder for actual SMS/Email integration (Twilio or Resend)
    console.log('Sending message:', message, 'to customers:', selectedCustomers);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Send Offers to Customers</h1>

      {/* Filtered Customer List with Checkboxes */}
      <div className="mb-4">
        <h2 className="text-xl mb-2">Select Customers</h2>
        {filteredCustomers.length > 0 ? (
          <div className="space-y-2">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`customer-${customer.id}`}
                  onChange={() => handleSelectCustomer(customer.id)}
                  checked={selectedCustomers.includes(customer.id)}
                  className="mr-2"
                />
                <label htmlFor={`customer-${customer.id}`}>{customer.name}</label>
              </div>
            ))}
          </div>
        ) : (
          <p>No customers to send offers to.</p>
        )}
      </div>

      {/* Custom Message Form */}
      <div className="mb-4">
        <h2 className="text-xl mb-2">Custom Message</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your offer message here..."
          className="w-full h-40 p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Send Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white p-2 rounded-md"
        disabled={selectedCustomers.length === 0 || message.trim() === ''}
      >
        Preview and Send
      </button>

      {/* Modal for Preview and Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl mb-4">Message Preview</h2>
            <p className="mb-4">{message}</p>

            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 p-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendOffersPage;

