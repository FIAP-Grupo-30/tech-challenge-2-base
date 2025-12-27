import React, { forwardRef, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, useEffect, useCallback, useRef } from 'react';

// ==========================================
// BUTTON - Estilo ByteBank Fase 1
// ==========================================
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', variant = 'primary', size = 'md', isLoading = false, fullWidth = false, disabled, ...props }, ref) => {
    const base = 'inline-flex justify-center items-center font-semibold rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#47A138]';
    
    const variants: Record<string, string> = {
      primary: 'bg-[#47A138] hover:bg-white text-white hover:text-[#47A138] border-2 border-[#47A138]',
      secondary: 'bg-transparent hover:bg-[#47A138] border-[3px] border-[#47A138] text-[#47A138] hover:text-white',
      dark: 'bg-black hover:bg-transparent border-[3px] border-black text-white hover:text-black',
      outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
      danger: 'bg-red-500 hover:bg-red-600 text-white border-2 border-red-500',
    };

    const sizes: Record<string, string> = {
      sm: 'h-9 px-4 text-sm min-w-[120px]',
      md: 'h-11 px-6 text-base min-w-[180px]',
      lg: 'h-14 px-8 text-lg min-w-[200px]',
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${isLoading || disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// ==========================================
// INPUT - Estilo ByteBank Fase 1
// ==========================================
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#47A138] focus:border-transparent ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ==========================================
// SELECT - Estilo ByteBank Fase 1
// ==========================================
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, error, options, id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
        <select
          ref={ref}
          id={selectId}
          className={`w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#47A138] focus:border-transparent ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

// ==========================================
// MODAL - Estilo ByteBank Fase 1
// ==========================================
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose();
  }, [onClose]);

  const handleOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const sizeClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg p-8 w-full mx-4 max-h-[90vh] overflow-y-auto animate-slideUp ${sizeClasses[size]}`}
      >
        {title && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition text-xl" aria-label="Fechar">
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

// ==========================================
// BALANCE CARD - Componente da Fase 1
// ==========================================
interface BalanceCardProps {
  value: number;
  isVisible?: boolean;
  className?: string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ value, isVisible = true, className = '' }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <span className={`font-semibold ${className}`}>
      {isVisible ? formatCurrency(value) : '••••••'}
    </span>
  );
};

// ==========================================
// TOGGLE EYE BUTTON - Componente da Fase 1
// ==========================================
interface ToggleEyeButtonProps {
  isVisible: boolean;
  onToggle: () => void;
  className?: string;
}

export const ToggleEyeButton: React.FC<ToggleEyeButtonProps> = ({ isVisible, onToggle, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`ml-2 p-1 hover:bg-[#e4e1e1] rounded transition ${className}`}
      aria-label={isVisible ? 'Ocultar saldo' : 'Mostrar saldo'}
    >
      {isVisible ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      )}
    </button>
  );
};
