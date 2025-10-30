'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

const NOISE_DENSITY = 0.03;
const OPACITY_MIN = 0.04;
const OPACITY_MAX = 0.2;
const COLOR_VARIATION = 0.15;
const USE_GRAYSCALE = true;

const DARK_MODE_BASE_MIN = 200;
const DARK_MODE_BASE_MAX = 255;
const LIGHT_MODE_BASE_MIN = 0;
const LIGHT_MODE_BASE_MAX = 80;

// Buffer size - larger than typical viewport to allow sampling
const BUFFER_WIDTH = 3840; // 4K width
const BUFFER_HEIGHT = 2160; // 4K height

export function NoiseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const offsetXRef = useRef(0);
  const offsetYRef = useRef(0);
  const [visible, setVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark =
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };

    // Check initially
    checkDarkMode();

    // Watch for class changes on html element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Watch for media query changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkDarkMode);
    };
  }, []);

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

      // Determine base color range based on theme
      const baseMin = isDarkMode ? DARK_MODE_BASE_MIN : LIGHT_MODE_BASE_MIN;
      const baseMax = isDarkMode ? DARK_MODE_BASE_MAX : LIGHT_MODE_BASE_MAX;

      // Generate noise based on configured parameters
      for (let i = 0; i < data.length; i += 4) {
        // Randomly decide if this pixel should have noise
        if (Math.random() < NOISE_DENSITY) {
          // Generate base noise value
          let baseValue: number;
          if (USE_GRAYSCALE) {
            // Grayscale noise: random value within theme-appropriate range
            baseValue = Math.random() * (baseMax - baseMin) + baseMin;
          } else {
            // Binary noise: use base min or max
            baseValue = Math.random() < 0.5 ? baseMin : baseMax;
          }

          // Add color variation (softer/harder white, or warmer/cooler tones)
          // Each RGB channel gets slightly different variation
          const rVariation = (Math.random() - 0.5) * COLOR_VARIATION * 255;
          const gVariation = (Math.random() - 0.5) * COLOR_VARIATION * 255;
          const bVariation = (Math.random() - 0.5) * COLOR_VARIATION * 255;

          // Apply variation and clamp to valid range
          const r = Math.max(0, Math.min(255, baseValue + rVariation));
          const g = Math.max(0, Math.min(255, baseValue + gVariation));
          const b = Math.max(0, Math.min(255, baseValue + bVariation));

          // Generate opacity within the configured range
          const opacity =
            Math.random() * (OPACITY_MAX - OPACITY_MIN) + OPACITY_MIN;

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
        'pointer-events-none fixed inset-0 duration-1000',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
