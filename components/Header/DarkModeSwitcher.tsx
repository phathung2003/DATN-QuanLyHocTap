import { useTheme } from 'next-themes';

//Icon
import LightIcon from '@/asset/vector/sun-2.svg';
import DarkIcon from '@/asset/vector/moon-2.svg';

export default function DarkModeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <li>
      <label
        className="relative m-0 block h-7.5 w-14 rounded-full bg-stroke dark:bg-primary"
        id="theme_control"
      >
        <button
          id="theme_switch"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />

        <span className="absolute left-[3px] top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear dark:!right-[3px] dark:!translate-x-full">
          <LightIcon id="dark_icon" className="dark:hidden" />
          <DarkIcon id="light_icon" className="hidden dark:inline-block" />
        </span>
      </label>
    </li>
  );
}
