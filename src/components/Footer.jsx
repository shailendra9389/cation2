import React, { useState, useEffect } from 'react';
import { RotateCcw, Waves, Syringe, Package, RotateCw, Wrench, Lock, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import axios from 'axios';

const Footer = ({ userLevel: propUserLevel }) => {
  const [userLevel, setUserLevel] = useState("guest");
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [lastChecked, setLastChecked] = useState(null);

  const checkAccess = (level, key) => {
    const accessMap = {
      engineer: ['temperature_control', 'hopper', 'injection_control', 'rotate_reset'],
      operator: ['bottle_rotate', 'door_lock', 'rotate_reset'],
      maintenance: ['clamp_control', 'alarm', 'rotate_reset', 'temperature_control'],
      admin: ['temperature_control', 'hopper', 'bottle_rotate', 'door_lock', 'clamp_control', 'alarm', 'injection_control', 'rotate_reset']
    };
    
    // If level is not recognized, default to guest with no access
    if (!level || !accessMap[level]) {
      console.log(`📦 Access denied for level: ${level}, key: ${key}`);
      return false;
    }
    
    const hasAccess = accessMap[level].includes(key);
    console.log(`📦 Access check for level: ${level}, key: ${key}, result: ${hasAccess}`);
    return hasAccess;
  };

  // Handle errors gracefully
  const handleError = (context, error) => {
    console.error(`Error in Footer component (${context}):`, error);
    // You could add additional error handling here, such as displaying a notification
  };
  
  // Check server connection status
  const checkConnectionStatus = async () => {
    try {
      const healthEndpoint = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5001';
      const response = await axios.get(`${healthEndpoint}/health`, { timeout: 5000 });
      setConnectionStatus(response.data.database === 'Connected' ? 'connected' : 'disconnected');
    } catch (error) {
      handleError('health check', error);
      setConnectionStatus('disconnected');
    } finally {
      setLastChecked(new Date());
    }
  };

  // Check connection status periodically
  useEffect(() => {
    // Initial check
    checkConnectionStatus();
    
    // Set up interval for periodic checks (every 30 seconds)
    const intervalId = setInterval(checkConnectionStatus, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Update UI when user level changes
  const updateUIForUserLevel = (level) => {
    if (!level) return;
    
    const normalizedLevel = level.toLowerCase();
    console.log(`📦 Updating UI for user level: ${normalizedLevel}`);
    setUserLevel(normalizedLevel);
    
    // You could add additional UI updates based on user level here
  };
  
  // Handle user level
  useEffect(() => {
    if (propUserLevel) {
      console.log("📦 Footer received userLevel from props:", propUserLevel); 
      updateUIForUserLevel(propUserLevel);
    } else {
      try {
        // First try to get user from localStorage as a JSON string
        const userDataStr = localStorage.getItem("user");
        console.log("📦 Footer read user string from localStorage:", userDataStr);
        
        if (userDataStr) {
          const userData = JSON.parse(userDataStr);
          console.log("📦 Footer parsed user from localStorage:", userData);
          
          if (userData?.userLevel) {
            updateUIForUserLevel(userData.userLevel);
          }
        } else {
          // Fallback: Try to get authToken and decode it
          const token = localStorage.getItem("authToken");
          if (token) {
            try {
              // JWT tokens are in format: header.payload.signature
              let decodedPayload = null;
              
              try {
                // We need the payload part which is the second part
                const payload = token.split('.')[1];
                if (!payload) {
                  throw new Error('Invalid token format');
                }
                
                // The payload is base64url encoded, we need to handle it properly
                // Replace non-base64 chars and add padding if needed
                const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
                const paddedBase64 = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
                
                // Now decode it
                const decodedText = atob(paddedBase64);
                decodedPayload = JSON.parse(decodedText);
                console.log("📦 Footer decoded token payload:", decodedPayload);
              } catch (decodeError) {
                 handleError('decoding JWT payload', decodeError);
               }
              
              if (decodedPayload && decodedPayload.userLevel) {
                 updateUIForUserLevel(decodedPayload.userLevel);
                
                // Store the user info in localStorage for future use
                const userInfo = {
                  id: decodedPayload.userId,
                  name: decodedPayload.name,
                  userLevel: decodedPayload.userLevel
                };
                localStorage.setItem("user", JSON.stringify(userInfo));
              }
            } catch (tokenErr) {
                handleError('decoding token', tokenErr);
              }
          }
        }
      } catch (err) {
        handleError('reading localStorage', err);
      }
    }
  }, [propUserLevel]);

  // Handle control button clicks
  const handleControlClick = (item) => {
    const hasAccess = checkAccess(userLevel, item.key);
    
    if (hasAccess) {
      console.log(`Control activated: ${item.key}`);
      // Implement the actual control functionality here
      alert(`${item.label} control activated by ${userLevel} user`);
    } else {
      console.log(`Access denied to ${item.key} for user level: ${userLevel}`);
      alert(`Access denied: Your user level (${userLevel}) does not have permission to use ${item.label}`);
    }
  };
  
  const footerItems = [
    { icon: RotateCcw, label: 'Rotate/Reset', key: 'rotate_reset' },
    { icon: Waves, label: 'Temperature Control', key: 'temperature_control' },
    { icon: Syringe, label: 'Injection Control', key: 'injection_control' },
    { icon: Package, label: 'Feeder/Hopper', key: 'hopper' },
    { icon: RotateCw, label: 'Bottle Rotate', key: 'bottle_rotate' },
    { icon: Wrench, label: 'Clamp Control', key: 'clamp_control' },
    { icon: Lock, label: 'Door Lock/Unlock', key: 'door_lock' },
    { icon: AlertTriangle, label: 'Alarm/Error', key: 'alarm' }
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-slate-700 to-slate-900 border-t border-slate-600 shadow-lg">
      <div className="flex flex-col px-4 py-2">
        {/* User level indicator */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-xs text-gray-400 mr-2">Access Level:</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${userLevel === 'admin' ? 'bg-purple-900 text-purple-200' : 
              userLevel === 'engineer' ? 'bg-blue-900 text-blue-200' : 
              userLevel === 'maintenance' ? 'bg-yellow-900 text-yellow-200' : 
              userLevel === 'operator' ? 'bg-green-900 text-green-200' : 
              'bg-gray-800 text-gray-400'}`}>
              {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
        {/* Connection status indicator */}
        <div className="flex items-center space-x-2">
          {connectionStatus === 'connected' ? (
            <Wifi size={18} className="text-green-400" />
          ) : connectionStatus === 'disconnected' ? (
            <WifiOff size={18} className="text-red-400 animate-pulse" />
          ) : (
            <Wifi size={18} className="text-yellow-400 animate-pulse" />
          )}
          <span className="text-xs text-gray-300">
            {connectionStatus === 'connected' ? 'Connected' : 
             connectionStatus === 'disconnected' ? 'Connection Error' : 'Checking...'}
          </span>
          {lastChecked && (
            <span className="text-xs text-gray-500 ml-1">
              {`Last checked: ${lastChecked.toLocaleTimeString()}`}
            </span>
          )}
        </div>
        
        {/* Control buttons */}
        <div className="flex items-center space-x-3">
          {footerItems.map((item, index) => {
            const Icon = item.icon;
            const canAccess = checkAccess(userLevel, item.key);

            return (
              <div
                key={item.key}
                className={`
                  flex items-center justify-center w-20 h-16 rounded-lg transition-colors
                  ${canAccess
                    ? 'text-blue-400 hover:text-white hover:bg-slate-600 cursor-pointer'
                    : 'text-gray-500 opacity-50 cursor-not-allowed'
                  }
                `}
                title={canAccess ? item.label : `${item.label} (Restricted)`}
                onClick={() => handleControlClick(item)}
              >
                <Icon size={36} strokeWidth={2.2} />
              </div>
            );
          })}
        </div>
        </div>
      </div>
      
      {/* Debug info - only visible in development */}
      {import.meta.env.DEV && (
        <div className="bg-gray-900 border-t border-gray-800 px-4 py-1">
          <details className="text-xs text-gray-500">
            <summary className="cursor-pointer hover:text-gray-400">Debug Info</summary>
            <div className="mt-1 space-y-1">
              <p>User Level: {userLevel}</p>
              <p>Connection: {connectionStatus}</p>
              <p>Last Checked: {lastChecked?.toLocaleTimeString()}</p>
            </div>
          </details>
        </div>
      )}
    </footer>
  );
};

export default Footer;
