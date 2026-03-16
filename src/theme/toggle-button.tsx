'use client';

import { Button } from '@/components/ui/button';
import { useThemeWipe } from '@/theme/wipe';
import { LaptopMinimal, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggleButton() {
  const { resolvedTheme } = useTheme();
  const { toTheme, toggleThemeWithWipe } = useThemeWipe();

  const theme = toTheme ?? resolvedTheme;

  return (
    <div
      className="group fixed top-2 right-2 z-[51] hidden items-center justify-end sm:flex"
      data-theme={theme}
      suppressHydrationWarning
    >
      <div className="-mr-4 w-0 overflow-hidden transition-[width,margin] duration-200 ease-out group-hover:w-13">
        <Button
          variant="ghost-circle"
          size="icon"
          className="text-foreground pointer-events-none translate-x-3 opacity-70 transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100"
          onClick={() => toggleThemeWithWipe('system')}
        >
          <LaptopMinimal className="size-4" />
        </Button>
      </div>
      <Button
        variant="ghost-circle"
        size="icon"
        className="text-foreground"
        onClick={() => toggleThemeWithWipe()}
        suppressHydrationWarning
      >
        {theme === 'dark' ? (
          <SunIcon className="size-4" />
        ) : (
          <MoonIcon className="size-4" />
        )}
      </Button>
    </div>
  );
}
