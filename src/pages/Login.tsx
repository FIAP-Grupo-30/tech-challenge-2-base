import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "@bytebank/root/bytebank-store";

export default function Login() {
	const auth = useStore(
		(state) =>
			state?.auth ?? {
				user: null,
				token: null,
				isAuthenticated: false,
				isLoading: false,
				error: null,
			},
	);
	const login = useStore((state) => state?.login);
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (auth?.isAuthenticated) {
			navigate("/dashboard");
		}
	}, [auth?.isAuthenticated, navigate]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login({ email, password });
			// redirect handled by isAuthenticated effect
		} catch (err) {
			// error handled by store state
		}
	};

	return (
		<div className="max-w-md mx-auto p-6">
			<h2 className="text-2xl font-bold mb-4">Login</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					type="email"
					className="p-2 border rounded"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Senha"
					type="password"
					className="p-2 border rounded"
				/>
				<button
					type="submit"
					disabled={auth?.isLoading}
					className="bg-green-500 text-white p-2 rounded"
				>
					{auth?.isLoading ? "Entrando..." : "Entrar"}
				</button>
			</form>
			{auth?.error && <p className="text-red-500 mt-2">{auth.error}</p>}
		</div>
	);
}
