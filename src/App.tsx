import useStore from "@bytebank/root/bytebank-store";
import { BrowserRouter } from "react-router-dom";
import ByteBankFooter from "./components/ByteBankFooter";
import ByteBankHeader from "./components/ByteBankHeader";
import AppRoutes from "./routes";

function App() {
	const assetBase =
		(typeof window !== "undefined" && window.__BYTEBANK_ASSET_BASE__) ||
		"http://localhost:9001";

	const { count, inc } = useStore();

	return (
		<BrowserRouter>
			<div className="flex flex-col min-h-screen">
				<ByteBankHeader
					logoUrl="logo-green.svg"
					logoSmallUrl="logo-small.svg"
					showAuthButtons={true}
					assetBase={assetBase}
				/>

				<div>
					<span>{count}</span>
					<button type="button" onClick={inc}>
						one up
					</button>
				</div>

				<main className="flex-1">
					<AppRoutes />
				</main>

				<ByteBankFooter logoUrl="logo-white.svg" assetBase={assetBase} />
			</div>
		</BrowserRouter>
	);
}

export default App;
