// ThemeSwitcher.tsx
import { useState } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('default');

  const handleChangeTheme = (newTheme: string) => {
    if(!newTheme) {
      document.documentElement.classList.remove(`theme-${theme}`);
      setTheme('default');
      return;
    }
    document.documentElement.classList.remove(`theme-${theme}`);
    document.documentElement.classList.add(`theme-${newTheme}`);
    setTheme(newTheme);
  };

  return (
    <div>
      <button onClick={() => handleChangeTheme('')}>Default Theme</button>
      <button onClick={() => handleChangeTheme('blue')}>Blue Theme</button>
      <button onClick={() => handleChangeTheme('red')}>Red Theme</button>
    </div>
  );
};

export default ThemeSwitcher;
