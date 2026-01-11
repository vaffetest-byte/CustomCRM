import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
import DealEditor from './pages/DealEditor';
import Lenders from './pages/Lenders';
import FundDeals from './pages/FundDeals';
import Settings from './pages/Settings';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />

            <Route path="contacts" element={<Contacts />} />

            <Route path="deals" element={<Deals />} />
            <Route path="deals/:id" element={<DealEditor />} />

            <Route path="lenders" element={<Lenders />} />

            <Route path="fund-deals" element={<FundDeals />} />

            <Route path="settings" element={<Settings />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
