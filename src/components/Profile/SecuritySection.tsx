'use client'
interface LoginHistoryItem {
    device: string;
    location: string;
    date: string;
    current: boolean;
  }
export const SecuritySection: React.FC = () => {
    const loginHistory: LoginHistoryItem[] = [
      {
        device: "Chrome on Windows",
        location: "New York, USA",
        date: "Dec 20, 2024",
        current: true
      },
      {
        device: "Safari on iPhone",
        location: "New York, USA",
        date: "Dec 18, 2024",
        current: false
      }
    ];
  
    const handlePasswordChange = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Password change submitted');
    };
  
    const handleTwoFactorToggle = (enabled: boolean) => {
      console.log('2FA toggled:', enabled);
    };
  
    const handleRemoveDevice = (device: string) => {
      console.log('Remove device:', device);
    };
  
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Security Settings</h3>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-semibold mb-4">Change Password</h4>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-600 focus:border-pink-600"
                />
              </div>
              <button type="submit" className="bg-myColor text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors">
                Update Password
              </button>
            </form>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-semibold mb-4">Two-Factor Authentication</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable 2FA</p>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  onChange={(e) => handleTwoFactorToggle(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-myColor"></div>
              </label>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-semibold mb-4">Login History</h4>
            <div className="space-y-4">
              {loginHistory.map((session, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{session.device}</p>
                    <p className="text-sm text-gray-500">{session.location} - {session.date}</p>
                  </div>
                  {session.current ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Current
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleRemoveDevice(session.device)}
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SecuritySection;