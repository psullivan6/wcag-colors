import { Button } from '@/components/Button/Button';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from 'usehooks-ts';

const ColorModeToggle = () => {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <Button variant="ghost" onClick={toggle} className="rounded-full">
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ColorModeToggle;
