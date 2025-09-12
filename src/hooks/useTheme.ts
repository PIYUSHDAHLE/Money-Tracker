import { useEffect, useState } from 'react';

export default function useTheme(){
  const [theme, set] = useState<'light'|'dark'>(() => (localStorage.getItem('theme') as 'light'|'dark') || 'light');
  useEffect(()=>{ document.documentElement.classList.toggle('dark', theme==='dark'); localStorage.setItem('theme', theme); }, [theme]);
  function toggle(){ set(t => t==='light'?'dark':'light'); }
  return { theme, toggle };
}