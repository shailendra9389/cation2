import { useState } from 'react'
import './App.css'

import IndustrialHeader from './components/IndustrialHeader.jsx'
import { DashboardSidebar } from './components/DashboardSidebar.jsx'
import Footer from './components/Footer'
import ThreeDViewer from './components/ThreeDViewer.jsx' // ✅ Add this

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col h-screen">
      {/* Top Header */}
      <IndustrialHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <DashboardSidebar />

        {/* Main Content Area */}
        <div className="flex-1 bg-white">
          <ThreeDViewer scale={0.15} /> {/* Stainless steel material is handled inside */}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
