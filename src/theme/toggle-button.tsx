'use client';

import { Button } from '@/components/ui/button';
import { useThemeWipe } from '@/theme/wipe';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggleButton() {
  const { resolvedTheme } = useTheme();
  const { toTheme, toggleThemeWithWipe } = useThemeWipe();

  const theme = toTheme ?? resolvedTheme;

  return (
    <div className="fixed top-2 right-2 z-[51]" data-theme={theme}>
      <Button
        variant="ghost-circle"
        size="icon"
        className="text-foreground"
        onClick={toggleThemeWithWipe}
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
