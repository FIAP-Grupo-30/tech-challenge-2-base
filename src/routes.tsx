import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import DashboardRedirect from "./pages/DashboardRedirect";
import Home from "./pages/Home";
import Login from "./pages/Login";

// import Produtos from './pages/Produtos';
// import Sobre from './pages/Sobre';

const DashboardApp = lazy(
	() => import("@bytebank/dashboard/bytebank-dashboard"),
);
const FinanceiroApp = lazy(
	() => import("@bytebank/financeiro/bytebank-financeiro"),
);

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/cadastro" element={<Cadastro />} />
			<Route path="/dashboard" element={<DashboardRedirect />} />
			<Route path="/dashboard" element={<DashboardApp />} />
			<Route path="/financeiro" element={<FinanceiroApp />} />
			{/* <Route path="/produtos" element={<Produtos />} />
      <Route path="/sobre" element={<Sobre />} /> */}
		</Routes>
	);
}
