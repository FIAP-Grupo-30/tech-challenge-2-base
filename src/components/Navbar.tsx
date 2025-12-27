import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { logout, checkAuth, selectIsAuthenticated, selectUser } from '../store/slices/authSlice';
import { BalanceCard, ToggleEyeButton } from './index';
import { selectBalance } from '../store/slices/accountSlice';
import { eventBus } from '../services/eventBus';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const balance = useAppSelector(selectBalance);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    eventBus.emitNavigate(path);
    setMenuOpen(false);
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-[#47A138] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="font-semibold text-lg hidden sm:block">ByteBank</span>
          </div>

          {/* Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => navigate('/dashboard')} className="text-gray-300 hover:text-white transition">
                Dashboard
              </button>
              <button onClick={() => navigate('/financeiro')} className="text-gray-300 hover:text-white transition">
                Financeiro
              </button>
              <button onClick={() => navigate('/extrato')} className="text-gray-300 hover:text-white transition">
                Extrato
              </button>
            </nav>
          )}

          {/* Right side */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Saldo */}
                <div className="hidden sm:flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-lg">
                  <span className="text-gray-400 text-sm">Saldo:</span>
                  <BalanceCard
                    value={balance}
                    isVisible={balanceVisible}
                    className={balance >= 0 ? 'text-[#47A138]' : 'text-red-500'}
                  />
                  <ToggleEyeButton
                    isVisible={balanceVisible}
                    onToggle={() => setBalanceVisible(!balanceVisible)}
                  />
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 hover:bg-gray-900 px-3 py-2 rounded-lg transition"
                  >
                    <div className="w-8 h-8 bg-[#47A138] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="hidden md:block text-sm">{user?.username}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 animate-fadeIn">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => navigate('/dashboard')}
                        className="md:hidden w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => navigate('/financeiro')}
                        className="md:hidden w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Financeiro
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="btn-bytebank-primary text-sm h-9 min-w-[100px]"
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
