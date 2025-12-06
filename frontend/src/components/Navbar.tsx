import { motion } from 'framer-motion';
import { Map, BarChart3 } from 'lucide-react';

interface NavbarProps {
  currentView: 'map' | 'dashboard';
  setCurrentView: (view: 'map' | 'dashboard') => void;
}

export function Navbar({ currentView, setCurrentView }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        height: '64px',
        backgroundColor: '#1976d2',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}
      >
        AI Crop Advisor
      </motion.h1>
      <div style={{ display: 'flex', gap: '12px' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView('map')}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: currentView === 'map' ? 'rgba(255,255,255,0.2)' : 'transparent',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: currentView === 'map' ? '600' : '400',
          }}
        >
          <Map size={18} />
          Map
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentView('dashboard')}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: currentView === 'dashboard' ? 'rgba(255,255,255,0.2)' : 'transparent',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: currentView === 'dashboard' ? '600' : '400',
          }}
        >
          <BarChart3 size={18} />
          AI Dashboard
        </motion.button>
      </div>
    </motion.nav>
  );
}

