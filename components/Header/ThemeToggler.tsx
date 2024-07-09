import { useTheme } from 'next-themes';

//Icon
import DarkIcon from '@/public/vector/moon-1.svg';
import LightIcon from '@/public/vector/sun-1.svg';

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      id="theme_switch"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-black dark:text-white md:h-14 md:w-14"
    >
      <DarkIcon
        id="dark_icon"
        className="hidden h-5 w-5 dark:block md:h-6 md:w-6"
      />
      <LightIcon
        id="light_icon"
        className="h-5 w-5 stroke-white dark:hidden md:h-6 md:w-6"
      />
    </button>
  );
}
