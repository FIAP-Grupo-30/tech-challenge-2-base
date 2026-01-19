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
	const fetchAccount = useStore((state) => state?.fetchAccount);
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
			// Após login bem-sucedido, carregar dados da conta
			if (fetchAccount) {
				await fetchAccount();
			}
			// redirect handled by isAuthenticated effect
		} catch (err) {
			// error handled by store state
		}
	};

	return (
		<div className="base:max-w-[600px] base:mx-auto base:p-8 base:bg-white base:rounded base:shadow base:mt-12">
			<h2 className="base:text-2xl base:font-bold base:mb-5">Login</h2>
			<form onSubmit={handleSubmit} className="base:flex base:flex-col base:gap-4">
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					type="email"
					className="base:p-3 base:border base:border-solid base:border-[#CCC] base:rounded"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Senha"
					type="password"
					className="base:p-3 base:border base:border-solid base:border-[#CCC] base:rounded"
				/>
				<button
					type="submit"
					disabled={auth?.isLoading}
					className="base:bg-[#47a138] base:text-white base:p-3 base:rounded"
				>
					{auth?.isLoading ? "Entrando..." : "Entrar"}
				</button>
			</form>
			{auth?.error && <p className="base:text-red-500 base:mt-3">{auth.error}</p>}
		</div>
	);
}
