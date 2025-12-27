'use client';

import Navbar from '@/components/navbar';
import { NoiseCanvas } from '@/components/noise-canvas';
import { ThemeToggleButton } from '@/theme/toggle-button';
import { ThemeWipeProvider, useThemeWipe } from '@/theme/wipe';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeWipeProvider>
        <ThemeWipeLayers>
          <div className="bg-background text-foreground flex h-full min-h-dvh w-screen flex-col items-center px-5 pt-10 pb-5">
            <div className="flex h-full w-full max-w-3xl flex-1 flex-col gap-8">
              <Navbar />
              {children}
              <div className="flex-1" />
              <Footer />
            </div>
          </div>
        </ThemeWipeLayers>
        <ThemeToggleButton />
      </ThemeWipeProvider>
    </>
  );
}

function Footer() {
  return (
    <div className="text-accent flex flex-col items-center font-mono">
      <p className="text-xs">Don&apos;t forget to sleep well tonight</p>
      <p className="text-sm">© {new Date().getFullYear()} Thomas Forbes</p>
    </div>
  );
}

function ThemeWipeLayers({ children }: { children: React.ReactNode }) {
  const { isTransitioning, toTheme, scrollY, completeWipe } = useThemeWipe();

  useEffect(() => {
    if (!isTransitioning) return;
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = 'hidden';
    return () => {
      el.style.overflow = prev;
    };
  }, [isTransitioning]);

  return (
    <>
      <NoiseCanvas />
      <div className={isTransitioning ? 'pointer-events-none' : undefined}>
        {children}
      </div>

      <AnimatePresence initial={false}>
        {isTransitioning && toTheme ? (
          <motion.div
            key={`theme-wipe-${toTheme}`}
            className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
            initial={{
              clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
            }}
            animate={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={completeWipe}
            aria-hidden
          >
            <div
              data-theme={toTheme}
              style={{ transform: `translateY(${-scrollY}px)` }}
            >
              <NoiseCanvas forcedTheme={toTheme} position="absolute" />
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
