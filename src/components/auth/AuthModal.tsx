import React, { useState } from 'react';
import { 
  loginWithEmailOrUsername, 
  registerPlayer, 
  loginWithGoogle, 
  logoutUser, 
  updateUserProfile,
  changeUserPassword
} from '../../services/authService';
import { UserProfile } from '../../types/character';

interface AuthModalProps {
  currentUser: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onUserChange: (user: UserProfile | null) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  onUserChange,
}) => {
  const [tab, setTab] = useState<'login' | 'register' | 'profile'>('login');
  
  // Login fields
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  // Register fields
  const [regDisplayName, setRegDisplayName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  // Profile edit fields
  const [editDisplayName, setEditDisplayName] = useState(currentUser?.displayName || '');
  const [newPassword, setNewPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await loginWithEmailOrUsername(identifier, password);
      onUserChange(user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erro ao entrar. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await registerPlayer(regEmail, regUsername, regPassword, regDisplayName);
      onUserChange(user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const user = await loginWithGoogle();
      onUserChange(user);
      onClose();
    } catch (err: any) {
      setError('Login com Google cancelado ou não configurado.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      onUserChange(null);
      setTab('login');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const updated = await updateUserProfile({ displayName: editDisplayName });
      if (newPassword) {
        await changeUserPassword(newPassword);
        setNewPassword('');
      }
      onUserChange(updated);
      setSuccessMsg('Perfil atualizado com glória celeste!');
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0e121a] border-2 border-amber-600/60 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Decorativo */}
        <div className="relative p-6 pb-4 border-b border-amber-500/20 bg-gradient-to-b from-amber-950/40 via-stone-900/60 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-amber-400/50 bg-amber-950/60 flex items-center justify-center text-amber-300 text-xl shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              ⚜️
            </div>
            <div>
              <h2 className="text-xl font-serif tracking-wider text-amber-200 font-bold">
                {currentUser ? 'Perfil de Navegante' : 'Terminal de Embarque'}
              </h2>
              <p className="text-xs text-amber-400/70 font-sans tracking-wide">
                A Era dos Céus Partidos • Registro de Almas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-amber-500/30 text-amber-400 hover:text-amber-100 hover:border-amber-400 hover:bg-amber-950/50 flex items-center justify-center transition-all text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tabs de Seleção */}
        {!currentUser && (
          <div className="flex border-b border-amber-900/40 bg-black/40">
            <button
              onClick={() => { setTab('login'); setError(null); }}
              className={`flex-1 py-3 text-sm font-serif tracking-wide transition-all border-b-2 ${
                tab === 'login'
                  ? 'border-amber-400 text-amber-200 bg-amber-950/20 font-bold'
                  : 'border-transparent text-amber-500/60 hover:text-amber-300'
              }`}
            >
              🔑 Entrar
            </button>
            <button
              onClick={() => { setTab('register'); setError(null); }}
              className={`flex-1 py-3 text-sm font-serif tracking-wide transition-all border-b-2 ${
                tab === 'register'
                  ? 'border-amber-400 text-amber-200 bg-amber-950/20 font-bold'
                  : 'border-transparent text-amber-500/60 hover:text-amber-300'
              }`}
            >
              📜 Forjar Registro
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 font-sans text-stone-200">
          
          {error && (
            <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-xs text-red-200 flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
              <span>✨</span>
              <span>{successMsg}</span>
            </div>
          )}

          {/* VIEW: LOGGED IN PROFILE */}
          {currentUser ? (
            <div className="space-y-5">
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-amber-400 overflow-hidden bg-stone-900 shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center text-2xl font-serif text-amber-300">
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-full h-full object-cover" />
                  ) : (
                    currentUser.displayName.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-serif text-amber-100">{currentUser.displayName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      currentUser.role === 'gm' 
                        ? 'bg-purple-900/80 text-purple-200 border border-purple-400/50 shadow-[0_0_10px_rgba(168,85,247,0.4)]' 
                        : 'bg-cyan-950/80 text-cyan-200 border border-cyan-500/40'
                    }`}>
                      {currentUser.role === 'gm' ? '👑 Mestre de CORE' : '🧭 Navegante'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">@{currentUser.username} • {currentUser.email}</p>
                </div>
              </div>

              {/* Formulário de Edição */}
              <form onSubmit={handleUpdateProfile} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-1">
                    Nome de Exibição
                  </label>
                  <input
                    type="text"
                    value={editDisplayName}
                    onChange={(e) => setEditDisplayName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-900/90 border border-amber-600/40 rounded-lg text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="Seu nome ou apelido"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-1">
                    Nova Senha (opcional)
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-stone-900/90 border border-amber-600/40 rounded-lg text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="Deixe em branco para manter a atual"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-serif font-bold text-sm rounded-lg shadow-lg shadow-amber-900/30 transition-all"
                  >
                    Salvar Alterações
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loading}
                    className="px-4 py-2.5 bg-red-950/60 hover:bg-red-900/70 text-red-300 border border-red-500/40 font-serif font-bold text-sm rounded-lg transition-all"
                  >
                    Sair
                  </button>
                </div>
              </form>
            </div>
          ) : tab === 'login' ? (
            /* VIEW: LOGIN */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-1">
                  E-mail ou Nome de Usuário
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="ex: sergio ou seu@email.com"
                  className="w-full px-4 py-2.5 bg-stone-900/90 border border-amber-600/40 rounded-lg text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-stone-600"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-1">
                  Senha Secreta
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 bg-stone-900/90 border border-amber-600/40 rounded-lg text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-stone-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-sm tracking-wide rounded-lg shadow-lg shadow-amber-900/40 transition-all uppercase"
              >
                {loading ? 'Consultando as Estrelas...' : '⚓ Embarcar nos Céus Partidos'}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-900/40"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0e121a] px-2 text-stone-500 font-serif">ou acesse com</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 font-serif text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <span>🌐</span> Entrar com Google
              </button>
            </form>
          ) : (
            /* VIEW: REGISTER */
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-1">
                  Seu Nome ou Nome do Jogador
                </label>
                <input
                  type="text"
                  required
                  value={regDisplayName}
                  onChange={(e) => setRegDisplayName(e.target.value)}
                  placeholder="ex: Augusta, Sérgio, Alice..."
                  className="w-full px-4 py-2 bg-stone-900/90 border border-amber-600/40 rounded-lg text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-1">
                  Nome de Usuário (único)
                </label>
                <input
                  type="text"
                  required
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="ex: sergio, capitavane..."
                  className="w-full px-4 py-2 bg-stone-900/90 border border-amber-600/40 rounded-lg text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2 bg-stone-900/90 border border-amber-600/40 rounded-lg text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-300 uppercase tracking-wider mb-1">
                  Senha (mínimo 6 dígitos)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-stone-900/90 border border-amber-600/40 rounded-lg text-amber-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-serif font-bold text-sm tracking-wide rounded-lg shadow-lg shadow-amber-900/40 transition-all uppercase"
              >
                {loading ? 'Gravando nas Tábuas...' : '✨ Criar Registro de Navegante'}
              </button>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-black/60 border-t border-amber-900/30 text-center text-[11px] text-amber-400/50 font-serif">
          O Livro de CORE permanece aberto a todos os leitores dos céus sem necessidade de login.
        </div>
      </div>
    </div>
  );
};
