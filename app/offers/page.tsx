'use client';

import { supabase } from '@/lib/supabase';
import React, { useState, useEffect } from 'react';

type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastvisited: string;
};

const SendOffersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch customers from Supabase
  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from('customers').select('*');

      if (error) {
        console.error('Error fetching customers:', error);
      } else if (data) {
        setCustomers(data);

        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 30);

        const filtered = data.filter((customer: Customer) => {
          const lastvisitedDate = new Date(customer.lastvisited);
          return lastvisitedDate < twoDaysAgo;
        });

        setFilteredCustomers(filtered);
      }
    };

    fetchCustomers();
  }, []);

  const handleSelectCustomer = (customerId: number) => {
    setSelectedCustomers((prevState) =>
      prevState.includes(customerId)
        ? prevState.filter((id) => id !== customerId)
        : [...prevState, customerId]
    );
  };

  const handleSendMessage = () => {
    console.log('Sending message:', message, 'to customers:', selectedCustomers);
    // TODO: Replace with actual API call to Twilio, Resend, etc.
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Send Offers to Customers</h1>

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

      <div className="mb-4">
        <h2 className="text-xl mb-2">Custom Message</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your offer message here..."
          className="w-full h-40 p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white p-2 rounded-md"
        disabled={selectedCustomers.length === 0 || message.trim() === ''}
      >
        Preview and Send
      </button>

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
