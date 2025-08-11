import { useState, useEffect } from 'react';
import './App.css';

import IndustrialHeader from './components/IndustrialHeader.jsx';
import { DashboardSidebar } from './components/DashboardSidebar.jsx';
import Footer from './components/Footer';
import ThreeDViewer from './components/ThreeDViewer.jsx';
import UserLogin from './components/UserLogin.jsx';
import UserList from './components/UserList.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState('3d');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (user) => {
    console.log("✅ Logged-in user:", user);
    setIsAuthenticated(true);
    setCurrentUser(user);
    
    // Store user information in localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      console.log("✅ User information stored in localStorage");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <UserLogin onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <IndustrialHeader
        user={currentUser}
        onLogout={handleLogout}
        onViewChange={setActiveView}
      />

      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />

        <div className="flex-1 bg-gray-900 p-4">
          {activeView === '3d' && <ThreeDViewer scale={0.15} />}
          {activeView === 'users' && <UserList />}
        </div>
      </div>

      <Footer userLevel={currentUser?.userLevel} />
    </div>
  );
}

export default App;
