'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useId, type ReactNode } from 'react';

const defaultVariants = {
  hidden: { opacity: 0, blur: 2, scale: 0.9 },
  visible: { opacity: 1, blur: 0, scale: 1 },
};

const firefoxVariants = {
  hidden: { blur: 2, scale: 0.9 },
  visible: { blur: 0, scale: 1 },
};

const duration = 0.1;

export function Switch({
  a,
  b,
  condition,
  containerClassName,
}: {
  a: ReactNode;
  b: ReactNode;
  condition: boolean;
  containerClassName?: string;
}) {
  const id = useId();
  const isFirefox =
    typeof navigator !== 'undefined' &&
    navigator.userAgent.toLowerCase().includes('firefox');
  const variants = isFirefox ? firefoxVariants : defaultVariants;
  return (
    <AnimatePresence mode="wait" initial={false}>
      {condition && !!a ? (
        <motion.div
          id={id + 'a'}
          key={id + 'a'}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration }}
          className={containerClassName}
        >
          {a}
        </motion.div>
      ) : !condition && !!b ? (
        <motion.div
          id={id + 'b'}
          key={id + 'b'}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration }}
          className={containerClassName}
        >
          {b}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
