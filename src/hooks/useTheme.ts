//自定义主题切换hooks
type Theme = 'light' | 'dark';

const THEME_KEY = 'blog-theme'; //键

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // 没有保存的主题，根据系统偏好设置设置主题
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  // 切换主题
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return { theme, toggleTheme };
}
