import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { selectAuth } from '../store/slices/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="p-2 border rounded" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password" className="p-2 border rounded" />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Entrar</button>
      </form>
      {auth.error && <p className="text-red-500 mt-2">{auth.error}</p>}
    </div>
  );
}
