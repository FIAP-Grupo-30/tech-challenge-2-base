import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import ByteBankHeader from './components/ByteBankHeader';
import ByteBankFooter from './components/ByteBankFooter';

function App() {
	const assetBase =
		(typeof window !== 'undefined' && window.__BYTEBANK_ASSET_BASE__) ||
		'http://localhost:9001';

	return (
		<BrowserRouter>
			<div className="flex flex-col min-h-screen">
				<ByteBankHeader
					logoUrl="logo-green.svg"
					logoSmallUrl="logo-small.svg"
					showAuthButtons={true}
					assetBase={assetBase}
				/>

				<main className="flex-1">
					<AppRoutes />
				</main>

				<ByteBankFooter logoUrl="logo-white.svg" assetBase={assetBase} />
			</div>
		</BrowserRouter>
	);
}

export default App;
