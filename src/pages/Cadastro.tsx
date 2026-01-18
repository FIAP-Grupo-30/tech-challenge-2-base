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
		<div className="base:max-w-md base:mx-auto base:p-6">
			<h2 className="base:text-2xl base:font-bold base:mb-4">Cadastro</h2>
			<form onSubmit={handleSubmit} className="base:flex base:flex-col base:gap-4">
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Nome"
					className="base:p-2 base:border base:rounded"
				/>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					type="email"
					className="base:p-2 base:border base:rounded"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Senha"
					type="password"
					className="base:p-2 base:border base:rounded"
				/>
				<button
					type="submit"
					disabled={auth?.isLoading}
					className="base:bg-green-500 base:text-white base:p-2 base:rounded"
				>
					{auth?.isLoading ? "Enviando..." : "Criar conta"}
				</button>
			</form>
			{auth?.error && <p className="base:text-red-500 base:mt-2">{auth.error}</p>}
		</div>
	);
}
