'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useRef, useState } from 'react';

type Settings = {
  noiseDensity: number;

  opacityMin: number;
  opacityMax: number;

  colorVariation: number;
  useGrayscale: boolean;

  baseMin: number;
  baseMax: number;
};

const LIGHT_SETTINGS: Settings = {
  noiseDensity: 0.02,
  opacityMin: 0.1,
  opacityMax: 0.3,
  colorVariation: 0.15,
  useGrayscale: true,
  baseMin: 0,
  baseMax: 80,
};

const DARK_SETTINGS: Settings = {
  noiseDensity: 0.02,
  opacityMin: 0.15,
  opacityMax: 0.4,
  colorVariation: 0.15,
  useGrayscale: true,
  baseMin: 200,
  baseMax: 255,
};

// Buffer size - larger than typical viewport to allow sampling
const BUFFER_WIDTH = 3840; // 4K width
const BUFFER_HEIGHT = 2160; // 4K height

export function NoiseCanvas({
  forcedTheme,
  position = 'fixed',
}: {
  forcedTheme?: 'light' | 'dark';
  position?: 'fixed' | 'absolute';
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const offsetXRef = useRef(0);
  const offsetYRef = useRef(0);
  const [visible, setVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkMode = useMemo(
    () => (forcedTheme ? forcedTheme === 'dark' : resolvedTheme === 'dark'),
    [forcedTheme, resolvedTheme],
  );

  // Generate noise buffer - only when dark mode changes
  useEffect(() => {
    if (!canvasRef.current) return;

    // Create or reuse buffer canvas
    if (!bufferCanvasRef.current) {
      bufferCanvasRef.current = document.createElement('canvas');
      bufferCanvasRef.current.width = BUFFER_WIDTH;
      bufferCanvasRef.current.height = BUFFER_HEIGHT;
    }

    const bufferCanvas = bufferCanvasRef.current;
    const bufferCtx = bufferCanvas.getContext('2d', { alpha: true });
    if (!bufferCtx) return;

    const generateNoise = (
      context: CanvasRenderingContext2D,
      width: number,
      height: number,
    ) => {
      const imageData = context.createImageData(width, height);
      const data = imageData.data;

      // Get settings based on current theme
      const settings = isDarkMode ? DARK_SETTINGS : LIGHT_SETTINGS;

      // Generate noise based on configured parameters
      for (let i = 0; i < data.length; i += 4) {
        // Randomly decide if this pixel should have noise
        if (Math.random() < settings.noiseDensity) {
          // Generate base noise value
          let baseValue: number;
          if (settings.useGrayscale) {
            // Grayscale noise: random value within theme-appropriate range
            baseValue =
              Math.random() * (settings.baseMax - settings.baseMin) +
              settings.baseMin;
          } else {
            // Binary noise: use base min or max
            baseValue =
              Math.random() < 0.5 ? settings.baseMin : settings.baseMax;
          }

          // Add color variation (softer/harder white, or warmer/cooler tones)
          // Each RGB channel gets slightly different variation
          const rVariation =
            (Math.random() - 0.5) * settings.colorVariation * 255;
          const gVariation =
            (Math.random() - 0.5) * settings.colorVariation * 255;
          const bVariation =
            (Math.random() - 0.5) * settings.colorVariation * 255;

          // Apply variation and clamp to valid range
          const r = Math.max(0, Math.min(255, baseValue + rVariation));
          const g = Math.max(0, Math.min(255, baseValue + gVariation));
          const b = Math.max(0, Math.min(255, baseValue + bVariation));

          // Generate opacity within the configured range
          const opacity =
            Math.random() * (settings.opacityMax - settings.opacityMin) +
            settings.opacityMin;

          data[i] = r; // R
          data[i + 1] = g; // G
          data[i + 2] = b; // B
          data[i + 3] = opacity * 255; // A
        } else {
          // Transparent pixel
          data[i + 3] = 0;
        }
      }

      context.putImageData(imageData, 0, 0);
    };

    // Generate noise on buffer canvas
    generateNoise(bufferCtx, BUFFER_WIDTH, BUFFER_HEIGHT);

    // Sample from buffer to visible canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      setVisible(false);
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      canvas.width = viewportWidth;
      canvas.height = viewportHeight;

      // If viewport is larger than buffer, regenerate buffer at larger size
      if (viewportWidth > BUFFER_WIDTH || viewportHeight > BUFFER_HEIGHT) {
        bufferCanvas.width = Math.max(viewportWidth, BUFFER_WIDTH);
        bufferCanvas.height = Math.max(viewportHeight, BUFFER_HEIGHT);
        generateNoise(bufferCtx, bufferCanvas.width, bufferCanvas.height);
      }

      // Calculate safe offset to sample from buffer
      const maxOffsetX = Math.max(0, bufferCanvas.width - viewportWidth);
      const maxOffsetY = Math.max(0, bufferCanvas.height - viewportHeight);

      // Randomize offset to sample different area of buffer
      // This ensures variety when resizing
      offsetXRef.current = maxOffsetX > 0 ? Math.random() * maxOffsetX : 0;
      offsetYRef.current = maxOffsetY > 0 ? Math.random() * maxOffsetY : 0;

      // Sample from buffer canvas
      ctx.clearRect(0, 0, viewportWidth, viewportHeight);
      ctx.drawImage(
        bufferCanvas,
        offsetXRef.current,
        offsetYRef.current,
        viewportWidth,
        viewportHeight,
        0,
        0,
        viewportWidth,
        viewportHeight,
      );

      setVisible(true);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        `pointer-events-none ${position} inset-0 duration-1000`,
        visible ? 'opacity-100' : 'opacity-0',
      )}
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
