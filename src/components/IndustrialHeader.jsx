import { useState, useEffect } from 'react';
import { AlertTriangle, Users, Home, Monitor, Shield, History, LogOut } from 'lucide-react';
import UserManagement from './UserManagement';


const IndustrialHeader = ({ user, onLogout, onViewChange }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAlerts, setShowAlerts] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const statusAlerts = [
    { id: 1, time: "09:25:30", message: "Hand-crank engaged", type: "warning", isActive: true },
    { id: 2, time: "09:15:44", message: "Enclosure zone not acknowledged for door #3", type: "error", isActive: false },
    { id: 3, time: "09:06:21", message: "Niveau bas de la tremie", type: "info", isActive: false }
  ];

  return (
    <header className="w-full bg-gradient-to-r from-gray-800 to-gray-700 border-b-2 border-gray-600 shadow-md">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between mb-2">
          
          {/* Left: Logo and Alerts */}
          <div className="flex items-center space-x-4 relative">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
              <span className="text-xl font-bold text-white tracking-wide">Sidel</span>
              <div className="relative group">
                <button 
                  onClick={() => setShowAlerts(!showAlerts)}
                  className="p-1 rounded hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <AlertTriangle className="w-8 h-6 text-yellow-400" />
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Alerts
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            
            {/* Alert Dropdown */}
            {showAlerts && (
  <div className="absolute top-12 left-0 bg-gray-200 border border-gray-400 rounded-lg shadow-md min-w-[24rem] z-50">
    {statusAlerts.map((alert, index) => (
      <div
        key={alert.id}
        className={`flex items-center space-x-2 text-sm px-2 py-1 
          ${alert.type === "warning" ? "bg-blue-600 text-white" : ""}
          ${alert.type === "error" ? "bg-gray-200 text-blue-700 font-semibold" : ""}
          ${alert.type === "info" ? "bg-gray-100 text-green-600 italic" : ""}
          ${index !== statusAlerts.length - 1 ? "border-b border-gray-400" : ""}
        `}
      >
        <span className="text-xs font-mono">
          &gt;&gt; {alert.time}
        </span>
        <span>
          {alert.message}
        </span>
      </div>
    ))}
  </div>
)}
          </div>

          {/* Center: Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-1">Main page</h1>
            <div className="text-sm text-gray-300 font-medium">Production</div>
          </div>

          {/* Right: Time, Status & Actions */}
          <div className="flex items-center space-x-6">
            {/* Time */}
            <div className="text-right">
              <div className="text-lg font-bold text-white font-mono">
                {formatTime(currentTime)}
              </div>
              <div className="text-sm text-gray-300">
                {formatDate(currentTime)}
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className="relative group">
                <button 
                  onClick={() => setShowUserManagement(true)}
                  className="p-1 rounded hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <Users className="w-5 h-5 text-green-400" />
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Add User
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              <span className="text-sm font-medium text-white">0 b/h</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <div className="relative group">
                <button 
                  onClick={() => onViewChange('3d')} 
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors shadow"
                >
                  <Home className="w-10 h-9 text-white" />
                </button>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Home
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              
              <div className="relative group">
                <button 
                  onClick={() => onViewChange('users')} 
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors shadow"
                >
                  <Users className="w-10 h-9 text-white" />
                </button>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  User Management
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              
              <div className="relative group">
                <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors shadow">
                  <Monitor className="w-10 h-9 text-white" />
                </button>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Monitor
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              
              <div className="relative group">
                <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors shadow">
                  <AlertTriangle className="w-10 h-9 text-white" />
                </button>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Alerts
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              
              <div className="relative group">
                <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors shadow">
                  <History className="w-10 h-9 text-white" />
                </button>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  History
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
              
              {/* Logout Button */}
              {onLogout && (
                <div className="relative group ml-4">
                  <button 
                    onClick={onLogout}
                    className="p-2 rounded-lg bg-red-700 hover:bg-red-600 transition-colors shadow"
                  >
                    <LogOut className="w-10 h-9 text-white" />
                  </button>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    Logout
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* User Management Modal */}
      <UserManagement isOpen={showUserManagement} onClose={() => setShowUserManagement(false)} />
    </header>
  );
};

export default IndustrialHeader;
