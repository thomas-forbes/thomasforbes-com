'use client';

import { Button } from '@/components/ui/button';
import { useThemeWipe } from '@/theme/wipe';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggleButton() {
  const { resolvedTheme } = useTheme();
  const { isTransitioning, toggleThemeWithWipe } = useThemeWipe();

  return (
    <div className="fixed top-2 right-2">
      <Button
        variant="ghost-circle"
        size="icon"
        disabled={isTransitioning}
        onClick={toggleThemeWithWipe}
        suppressHydrationWarning
      >
        {resolvedTheme === 'dark' ? (
          <SunIcon className="size-4" />
        ) : (
          <MoonIcon className="size-4" />
        )}
      </Button>
    </div>
  );
}
