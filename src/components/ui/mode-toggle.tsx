'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="checkbox"
          id="theme-toggle"
          className="sr-only"
          checked={theme === 'dark'}
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
        <label
          htmlFor="theme-toggle"
          className={`block w-14 h-8 rounded-full border-black border-2 cursor-pointer transition-colors bg-custom-orange z-10`}
        >
          <div
            className={`absolute flex justify-center items-center top-1 left-1 w-6 h-6 bg-black rounded-full transition-transform ${
              theme === 'dark' ? 'transform translate-x-6 bg-ff6c2c' : ''
            }`}
          >
            {theme === 'dark' ? (
              <FaMoon size={14} className="text-custom-orange" />
            ) : (
              <FaSun size={14} className="text-custom-orange" />
            )}
          </div>
        </label>
      </div>
    </div>
  );
}
