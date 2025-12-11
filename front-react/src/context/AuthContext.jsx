import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка пользователя при монтировании
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Ошибка при загрузке пользователя:', err);
      }
    }
    setLoading(false);
  }, []);

  // Регистрация
  const register = async (email, password, name) => {
    setError(null);
    try {
      // Проверка, существует ли уже такой пользователь
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (existingUsers.some(u => u.email === email)) {
        throw new Error('Пользователь с таким email уже существует');
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        password: password, // В реальном приложении пароль должен быть захеширован!
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Автоматический вход после регистрации
      const userData = { id: newUser.id, email, name };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Вход
  const login = async (email, password) => {
    setError(null);
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (!foundUser) {
        throw new Error('Неверные email или пароль');
      }

      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Выход
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Хук для использования авторизации
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
}

export default AuthProvider;