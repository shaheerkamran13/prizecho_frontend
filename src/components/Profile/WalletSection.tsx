'use client'

import React, { useState } from 'react';
import { CreditCard, Plus, History, Wallet as WalletIcon } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  date: string;
  description: string;
}

const WalletSection = () => {
  const [balance, setBalance] = useState<number>(1000); // Example balance
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      amount: 500,
      date: '2024-01-01',
      description: 'Added via Credit Card',
    },
    {
      id: '2',
      type: 'debit',
      amount: 200,
      date: '2024-01-05',
      description: 'Purchase of Product XYZ',
    },
  ]);

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = (e.target as any).amount.value;
    if (amount) {
      setBalance((prev) => prev + parseFloat(amount));
      setTransactions((prev) => [
        {
          id: (prev.length + 1).toString(),
          type: 'credit',
          amount: parseFloat(amount),
          date: new Date().toISOString().split('T')[0],
          description: 'Added via Credit Card',
        },
        ...prev,
      ]);
      (e.target as any).reset();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
          {/* Main Content */}
          <div className="md:col-span-9">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Wallet</h3>

                {/* Wallet Balance */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-semibold mb-4">Wallet Balance</h4>
                  <p className="text-3xl font-bold text-myColor">PKR {balance.toFixed(2)}</p>
                </div>

                {/* Add Funds */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-semibold mb-4">Add Funds</h4>
                  <form onSubmit={handleAddFunds} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <input
                        type="number"
                        name="amount"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-myColor text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add Funds</span>
                    </button>
                  </form>
                </div>

                {/* Transaction History */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-semibold mb-4">Transaction History</h4>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex justify-between items-center py-3 border-b last:border-b-0"
                      >
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <p
                          className={`text-sm ${
                            transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {transaction.type === 'credit' ? '+' : '-'}PKR {transaction.amount.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSection;