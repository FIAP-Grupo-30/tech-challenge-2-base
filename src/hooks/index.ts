import { useEffect, useCallback, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { eventBus } from '../services/eventBus';
import type { MFEEvent } from '../types';

// Hooks tipados para Redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Hook para eventos entre MFEs
export function useMFEEvent<T = unknown>(
  eventType: string,
  handler: (event: MFEEvent<T>) => void,
  deps: React.DependencyList = []
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
export function useCurrencyFormatter(locale = 'pt-BR', currency = 'BRL') {
  const format = useCallback(
    (value: number) => {
      return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
    },
    [locale, currency]
  );

  return { format };
}

// Hook para formatação de data
export function useDateFormatter(locale = 'pt-BR') {
  const formatDate = useCallback(
    (date: string | Date) => {
      const d = typeof date === 'string' ? new Date(date) : date;
      return d.toLocaleDateString(locale);
    },
    [locale]
  );

  const formatDateTime = useCallback(
    (date: string | Date) => {
      const d = typeof date === 'string' ? new Date(date) : date;
      return d.toLocaleString(locale);
    },
    [locale]
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
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return { ...auth, dispatch };
}

export function useAccount() {
  const account = useAppSelector((state) => state.account);
  return account;
}

export function useTransactions() {
  const transactions = useAppSelector((state) => state.transactions);
  return transactions;
}
