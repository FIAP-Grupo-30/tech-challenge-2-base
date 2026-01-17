import useStore from "@bytebank/root/bytebank-store";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
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
	const register = useStore((state) => state?.register);
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
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
			await register({ username, email, password });
			// after successful register, user can login manually or we could auto-login
			// here we'll navigate to login so user can authenticate
			navigate("/login");
		} catch (err) {
			// handled in store
		}
	};

	return (
		<div className="max-w-md mx-auto p-6">
			<h2 className="text-2xl font-bold mb-4">Cadastro</h2>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Nome"
					className="p-2 border rounded"
				/>
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
					{auth?.isLoading ? "Enviando..." : "Criar conta"}
				</button>
			</form>
			{auth?.error && <p className="text-red-500 mt-2">{auth.error}</p>}
		</div>
	);
}
