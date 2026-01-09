// Single-spa entry for the base microfrontend
import React from 'react';
import * as ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App.jsx';

const AppWithProvider = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

const lifecycles = singleSpaReact({
	React,
	ReactDOM,
	rootComponent: AppWithProvider,
	errorBoundary(err, info, props) {
		console.error('❌ @bytebank/base error:', err, info);
		return React.createElement('div', { style: { padding: 16, color: 'red' } }, 'Erro no módulo base');
	},
});

export const { bootstrap, mount, unmount } = lifecycles;

