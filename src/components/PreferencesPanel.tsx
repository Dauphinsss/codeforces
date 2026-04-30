import { useEffect, useState } from 'react';
import { Contrast, Moon, Sun, Type } from 'lucide-react';

type Theme = 'light' | 'dark';
type ContrastMode = 'normal' | 'high';
type FontSize = 'normal' | 'large' | 'xlarge';

function setPreference(name: string, value: string) {
  document.documentElement.dataset[name] = value;
  localStorage.setItem(name === 'fontSize' ? 'fontSize' : name, value);
}

export default function PreferencesPanel() {
  const [theme, setTheme] = useState<Theme>('light');
  const [contrast, setContrast] = useState<ContrastMode>('normal');
  const [fontSize, setFontSize] = useState<FontSize>('normal');

  useEffect(() => {
    setTheme((localStorage.getItem('theme') as Theme) || 'light');
    setContrast((localStorage.getItem('contrast') as ContrastMode) || 'normal');
    setFontSize((localStorage.getItem('fontSize') as FontSize) || 'normal');
  }, []);

  const nextTheme = theme === 'dark' ? 'light' : 'dark';
  const nextContrast = contrast === 'high' ? 'normal' : 'high';

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Preferencias visuales">
      <button
        className="btn btn-ghost"
        type="button"
        aria-label={`Cambiar a modo ${nextTheme === 'dark' ? 'oscuro' : 'claro'}`}
        onClick={() => {
          setTheme(nextTheme);
          setPreference('theme', nextTheme);
        }}
      >
        {theme === 'dark' ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
        <span>{theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
      </button>
      <button
        className="btn btn-ghost"
        type="button"
        aria-label={nextContrast === 'high' ? 'Activar alto contraste' : 'Desactivar alto contraste'}
        onClick={() => {
          setContrast(nextContrast);
          setPreference('contrast', nextContrast);
        }}
      >
        <Contrast aria-hidden="true" size={18} />
        <span>{contrast === 'high' ? 'Contraste normal' : 'Alto contraste'}</span>
      </button>
      <label className="border-app inline-flex min-h-11 items-center gap-2 rounded border px-3">
        <Type aria-hidden="true" size={18} />
        <span className="font-bold">Texto</span>
        <select
          aria-label="Tamano de fuente"
          className="min-h-11 rounded bg-transparent"
          value={fontSize}
          onChange={(event) => {
            const value = event.target.value as FontSize;
            setFontSize(value);
            setPreference('fontSize', value);
          }}
        >
          <option value="normal">Normal</option>
          <option value="large">Grande</option>
          <option value="xlarge">Extra grande</option>
        </select>
      </label>
    </div>
  );
}
