import React, { useState } from 'react';
import { 
  RotateCcw,      // Rotate/Reset
  Waves,          // Temperature Control (Heating/Airflow)
  Syringe,        // Injection Control
  Package,        // Feeder/Hopper (material load)
  RotateCw,       // Bottle Rotate
  Wrench,         // Clamp Control
  Lock,           // Door Lock/Unlock
  AlertTriangle   // Alarm/Error
} from 'lucide-react';

const Footer = () => {
  const footerItems = [
    { icon: RotateCcw, label: 'Rotate/Reset' },
    { icon: Waves, label: 'Temperature Control' },
    { icon: Syringe, label: 'Injection Control' },
    { icon: Package, label: 'Feeder/Hopper' },
    { icon: RotateCw, label: 'Bottle Rotate' },
    { icon: Wrench, label: 'Clamp Control' },
    { icon: Lock, label: 'Door Lock/Unlock' },
    { icon: AlertTriangle, label: 'Alarm/Error' }
  ];

  // Track the active icon index
  const [activeIndex, setActiveIndex] = useState(6); // Default: Lock is active (index 6)

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-slate-700 to-slate-900 border-t border-slate-600 shadow-lg">
      <div className="flex items-center justify-center px-4 py-3">
        <div className="flex items-center space-x-3">
          {footerItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)} // ✅ Change active icon on click
                className={`
                  flex items-center justify-center w-20 h-16 rounded-lg transition-colors cursor-pointer
                  ${isActive 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'text-blue-400 hover:text-white hover:bg-slate-600'
                  }
                `}
                title={item.label} // tooltip on hover
              >
                <Icon size={36} strokeWidth={2.2} />
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
