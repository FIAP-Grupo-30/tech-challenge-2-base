import type { MFEEvent } from '../types';

type EventHandler<T = unknown> = (event: MFEEvent<T>) => void;

class EventBus {
  private static instance: EventBus;
  private listeners: Map<string, Set<EventHandler>>;

  private constructor() {
    this.listeners = new Map();

    // Escuta eventos globais do window
    window.addEventListener('bytebank-event', ((event: CustomEvent<MFEEvent>) => {
      this.handleEvent(event.detail);
    }) as EventListener);
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  private handleEvent(event: MFEEvent): void {
    const handlers = this.listeners.get(event.type);
    handlers?.forEach((handler) => {
      try {
        handler(event);
      } catch (e) {
        console.error(`Erro ao processar evento ${event.type}:`, e);
      }
    });
  }

  subscribe<T = unknown>(eventType: string, handler: EventHandler<T>): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(handler as EventHandler);

    // Retorna função para cancelar inscrição
    return () => {
      this.listeners.get(eventType)?.delete(handler as EventHandler);
    };
  }

  emit<T = unknown>(eventType: string, payload: T, source: MFEEvent['source'] = 'base'): void {
    const event: MFEEvent<T> = {
      type: eventType,
      payload,
      source,
      timestamp: Date.now(),
    };

    // Dispara localmente
    this.handleEvent(event);

    // Dispara globalmente para outros MFEs
    window.dispatchEvent(new CustomEvent('bytebank-event', { detail: event }));
  }

  // Eventos predefinidos
  emitAuthChange(isAuthenticated: boolean): void {
    this.emit('auth:change', { isAuthenticated }, 'base');
  }

  emitTransactionCreated(transactionId: string): void {
    this.emit('transaction:created', { transactionId }, 'financeiro');
  }

  emitTransactionsUpdated(): void {
    this.emit('transactions:updated', {}, 'financeiro');
  }

  emitRefreshDashboard(): void {
    this.emit('dashboard:refresh', {}, 'dashboard');
  }

  emitNavigate(path: string): void {
    this.emit('navigate', { path }, 'base');
  }
}

export const eventBus = EventBus.getInstance();
export default eventBus;
