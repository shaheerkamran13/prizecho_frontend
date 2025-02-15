'use client'

import React, { useState, useEffect } from 'react';
import { Trash2, ChevronDown, X } from 'lucide-react';

const DeleteAccountSection = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToaster, setShowToaster] = useState(false);

  const reasons = [
    'I no longer need this account',
    'I have a privacy concern',
    'I found a better alternative',
    'Other',
  ];

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    // Simulate an API call for deletion
    setTimeout(() => {
      setIsDeleting(false);
      setIsConfirmationOpen(false);
      setShowToaster(true); // Show toaster after deletion
    }, 2000);
  };

  // Automatically hide the toaster after 3 seconds
  useEffect(() => {
    if (showToaster) {
      const timer = setTimeout(() => {
        setShowToaster(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToaster]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Delete Account</h3>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h4 className="font-semibold mb-4">Permanently Delete Your Account</h4>
        <p className="text-sm text-gray-600 mb-6">
          Deleting your account will remove all your data, including orders, wishlists, and personal information. This action cannot be undone.
        </p>

        {/* Delete Account Button */}
        <button
          onClick={() => setIsConfirmationOpen(true)}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-2"
        >
          <Trash2 size={18} />
          <span>Delete Account</span>
        </button>

        {/* Confirmation Dialog */}
        {isConfirmationOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
              <h4 className="font-semibold mb-4">Confirm Account Deletion</h4>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete your account? Please let us know why you're leaving.
              </p>

              {/* Reason Selection Dropdown */}
              <div className="relative mb-6">
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-myColor focus:border-myColor"
                >
                  <option value="" disabled>
                    Select a reason
                  </option>
                  {reasons.map((reason, index) => (
                    <option key={index} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsConfirmationOpen(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={!selectedReason || isDeleting}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <span>Deleting...</span>
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      <span>Delete Account</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toaster Notification */}
      {showToaster && (
        <div className="fixed bottom-4 right-4 bg-green-50 text-green-700 p-4 rounded-lg shadow-lg flex items-center space-x-4 animate-popup2 z-50">
          <span>Your account has been deleted successfully.</span>
          <button
            onClick={() => setShowToaster(false)}
            className="text-green-700 hover:text-green-800"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountSection;