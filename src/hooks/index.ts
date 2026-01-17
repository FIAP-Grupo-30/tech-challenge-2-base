import { useEffect, useCallback, useState } from "react";
import useStore from "@bytebank/root/bytebank-store";
import { eventBus } from "../services/eventBus";
import type { MFEEvent } from "../types";

// Hook para eventos entre MFEs
export function useMFEEvent<T = unknown>(
	eventType: string,
	handler: (event: MFEEvent<T>) => void,
	deps: React.DependencyList = [],
): void {
	useEffect(() => {
		const unsubscribe = eventBus.subscribe(eventType, handler);
		return () => unsubscribe();
	}, [eventType, ...deps]);
}

// Hook de debounce
export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(timer);
	}, [value, delay]);

	return debouncedValue;
}

// Hook para formatação de moeda
export function useCurrencyFormatter(locale = "pt-BR", currency = "BRL") {
	const format = useCallback(
		(value: number) => {
			return new Intl.NumberFormat(locale, {
				style: "currency",
				currency,
			}).format(value);
		},
		[locale, currency],
	);

	return { format };
}

// Hook para formatação de data
export function useDateFormatter(locale = "pt-BR") {
	const formatDate = useCallback(
		(date: string | Date) => {
			const d = typeof date === "string" ? new Date(date) : date;
			return d.toLocaleDateString(locale);
		},
		[locale],
	);

	const formatDateTime = useCallback(
		(date: string | Date) => {
			const d = typeof date === "string" ? new Date(date) : date;
			return d.toLocaleString(locale);
		},
		[locale],
	);

	return { formatDate, formatDateTime };
}

// Hook para visibilidade do saldo
export function useBalanceVisibility() {
	const [isVisible, setIsVisible] = useState(true);
	const toggle = useCallback(() => setIsVisible((prev) => !prev), []);
	return { isVisible, toggle, setIsVisible };
}

// Hooks de domínio
export function useAuth() {
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
	const register = useStore((state) => state?.register);
	const logout = useStore((state) => state?.logout);
	const checkAuth = useStore((state) => state?.checkAuth);
	return {
		...auth,
		login,
		register,
		logout,
		checkAuth,
	};
}

export function useAccount() {
	return useStore((state) => state.account);
}

export function useTransactions() {
	return useStore((state) => state.transactions);
}
