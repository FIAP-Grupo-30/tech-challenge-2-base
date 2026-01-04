import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
// import Produtos from './pages/Produtos';
// import Sobre from './pages/Sobre';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/produtos" element={<Produtos />} />
      <Route path="/sobre" element={<Sobre />} /> */}
    </Routes>
  );
}
