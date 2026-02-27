import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useThemeStore } from '../theme/useTheme';
import { themes } from '../theme/themeConfig';
import type { ThemeId } from '../theme/themeConfig';
import './ThemeSelector.css';

export const ThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentThemeId, setTheme } = useThemeStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: ThemeId) => {
    setTheme(id);
    setIsOpen(false);
  };

  return (
    <div className="theme-selector" ref={dropdownRef}>
      <button 
        className="theme-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme selector"
        title="Cambiar Tema"
      >
        <Palette size={20} />
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <div className="theme-dropdown-header">
            <span>Themes</span>
          </div>
          {Object.values(themes).map((theme) => (
            <button
              key={theme.id}
              className={`theme-option ${currentThemeId === theme.id ? 'active' : ''}`}
              onClick={() => handleSelect(theme.id)}
            >
              <div className="theme-preview">
                <div 
                  className="color-circle bg" 
                  style={{ backgroundColor: theme.colors.bgColor }} 
                />
                <div 
                  className="color-circle primary" 
                  style={{ backgroundColor: theme.colors.accentColor }} 
                />
              </div>
              <span className="theme-name">{theme.name}</span>
              {currentThemeId === theme.id && <Check size={16} className="theme-check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
