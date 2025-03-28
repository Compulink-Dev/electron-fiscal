//@ts-nocheck
// App.tsx
import { useEffect, useState } from 'react';
import './App.css';
import MainLayout from './MainLayout';
import Invoice from './components/invoice';
import { Login } from './components/Login';

function App() {
  const [activeView, setActiveView] = useState<View>('CPU');

  useEffect(() => {
    if (!window.electron) {
      console.error('Electron API not available');
      return;
    }

    const unsubscribe = window.electron.subscribeChangeView((view) => {
      setActiveView(view);
    });

    return () => unsubscribe();
  }, []);

  return (
    <MainLayout>
      {activeView === 'Invoice' ? <Invoice /> : <Invoice/>}
    </MainLayout>
  );
}

export default App;