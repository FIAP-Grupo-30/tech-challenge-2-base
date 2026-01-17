import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: "@bytebank/base",
			filename: "remoteEntry.js",
			exposes: {
				"./bytebank-base": "./src/exposes/bytebank-base.tsx",
			},
			remotes: {
				"@bytebank/financeiro": "http://localhost:9002/assets/remoteEntry.js",
				"@bytebank/dashboard": "http://localhost:9003/assets/remoteEntry.js",
				"@bytebank/root": "http://localhost:9000/assets/remoteEntry.js",
			},
			shared: ["react", "react-dom", "react-router-dom"],
		}),
	],
	build: {
		modulePreload: false,
		target: "esnext",
		minify: false,
		cssCodeSplit: false,
	},
	server: {
		port: 9000,
		fs: {
			allow: ["."],
		},
	},
	preview: {
		port: 9001,
	},
});
