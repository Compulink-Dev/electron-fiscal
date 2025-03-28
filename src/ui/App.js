import { jsx as _jsx } from "react/jsx-runtime";
//@ts-nocheck
// App.tsx
import { useEffect, useState } from 'react';
import './App.css';
import MainLayout from './MainLayout';
import Invoice from './components/invoice';
function App() {
    const [activeView, setActiveView] = useState('CPU');
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
    return (_jsx(MainLayout, { children: activeView === 'Invoice' ? _jsx(Invoice, {}) : _jsx(Invoice, {}) }));
}
export default App;
