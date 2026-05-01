import { Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/features/landing/LandingPage';
import { DevHealthPage } from '@/pages/DevHealthPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {import.meta.env.DEV && <Route path="/dev" element={<DevHealthPage />} />}
    </Routes>
  );
}
