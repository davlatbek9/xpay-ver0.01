import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Phone,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { XPayLogo } from '../XPayLogo';
import { useFinance } from '../../context/FinanceContext';

export const AuthScreen: React.FC = () => {
  const { loginWithGoogle, loginWithCredentials, registerAccount } = useFinance();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form fields
  const [fullName, setFullName] = useState('Davlatbek Xayrullayev');
  const [identifier, setIdentifier] = useState('+998 90 123 45 67');
  const [email, setEmail] = useState('davlatbek@xpay.uz');
  const [password, setPassword] = useState('xpay2026!');
  const [confirmPassword, setConfirmPassword] = useState('xpay2026!');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError('Barcha maydonlarni to\'ldiring');
      return;
    }

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Parollar bir-biriga mos kelmadi');
        return;
      }
      registerAccount(fullName, identifier, email);
    } else {
      loginWithCredentials(identifier, password);
    }
  };

  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 bg-mesh-dark">
      {/* Background glow waves */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md rounded-3xl bg-[#091122]/95 border border-blue-900/50 p-6 sm:p-8 space-y-5 shadow-2xl relative z-10 backdrop-blur-xl">
        {/* Top: Official XPAY Logo & Slogan */}
        <div className="text-center space-y-3">
          <div className="flex justify-center hover:scale-105 transition-transform">
            <XPayLogo size={60} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-mono">
              XPAY
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Barcha moliyaviy imkoniyatlar bitta ilovada
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">
            {mode === 'login' ? 'Kirish' : "Ro'yxatdan o'tish"}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {mode === 'login'
              ? 'Hisobingizga kiring va davom eting'
              : "Tez va xavfsiz ro'yxatdan o'ting"}
          </p>
        </div>

        {/* Google Login Button (High Priority User Requirement) */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 shadow-xl shadow-white/10 active:scale-98 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google orqali davom etish</span>
          </button>

          <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2.5 transition-colors"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.13-1.96.99-3.1-.98.04-2.16.65-2.84 1.46-.61.7-.1.14 1.83.99 3.1.02.01.02.01.02.01.01 0 1.16-.65 1.82-1.47" />
            </svg>
            <span>Apple bilan kirish</span>
          </button>
        </div>

        {/* Separator */}
        <div className="relative my-2 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <span className="relative px-3 bg-[#091122] text-[11px] text-slate-500 uppercase tracking-wider">
            Yoki telefon / parol bilan
          </span>
        </div>

        {/* Input Form (Matches Showcase Screen 2) */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">To'liq ism</label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Davlatbek Xayrullayev"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-slate-400 block mb-1">
              Email yoki telefon raqami
            </label>
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="+998 90 123 45 67 yoki email"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                required
              />
              <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Parol</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                required
              />
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Parolni tasdiqlang</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  required
                />
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Meni eslab qolish</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Parolni tiklash kodi emailingizga yuborildi.')}
                className="text-cyan-400 hover:underline"
              >
                Parolni unutdingizmi?
              </button>
            </div>
          )}

          {error && <p className="text-xs text-rose-400 font-medium text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 active:scale-95 transition-all mt-2"
          >
            {mode === 'login' ? 'Kirish' : "Ro'yxatdan o'tish"}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="pt-2 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              Hisob yo'qmi?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
                className="text-cyan-400 font-semibold hover:underline"
              >
                Ro'yxatdan o'tish
              </button>
            </p>
          ) : (
            <p>
              Hisobingiz bormi?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className="text-cyan-400 font-semibold hover:underline"
              >
                Kirish
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
