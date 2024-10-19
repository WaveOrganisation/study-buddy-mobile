import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { View, ViewProps } from 'react-native';

import { cn } from '@/utils/cn';

// Define elevation variants for light and dark mode
export const paperVariants = cva('rounded-lg', {
  variants: {
    elevation: {
      0: 'bg-white dark:bg-black shadow-none dark:shadow-none',
      1: 'bg-white dark:bg-black shadow-sm dark:shadow-sm',
      2: 'bg-white dark:bg-black shadow dark:shadow',
      3: 'bg-white dark:bg-black shadow-md dark:shadow-md',
      4: 'bg-white dark:bg-black shadow-lg dark:shadow-lg',
      5: 'bg-white dark:bg-black shadow-xl dark:shadow-xl',
      6: 'bg-gray-100 dark:bg-gray-900 shadow-xl dark:shadow-2xl',
      7: 'bg-gray-100 dark:bg-gray-900 shadow-2xl dark:shadow-3xl',
      8: 'bg-gray-100 dark:bg-gray-900 shadow-3xl dark:shadow-4xl',
      9: 'bg-gray-200 dark:bg-gray-800 shadow-4xl dark:shadow-5xl',
      10: 'bg-gray-200 dark:bg-gray-800 shadow-5xl dark:shadow-6xl',
      11: 'bg-gray-200 dark:bg-gray-800 shadow-6xl dark:shadow-7xl',
      12: 'bg-gray-300 dark:bg-gray-700 shadow-7xl dark:shadow-8xl',
      13: 'bg-gray-300 dark:bg-gray-700 shadow-8xl dark:shadow-9xl',
      14: 'bg-gray-300 dark:bg-gray-700 shadow-9xl dark:shadow-10xl',
      15: 'bg-gray-400 dark:bg-gray-600 shadow-10xl dark:shadow-11xl',
      16: 'bg-gray-400 dark:bg-gray-600 shadow-11xl dark:shadow-12xl',
      17: 'bg-gray-400 dark:bg-gray-600 shadow-12xl dark:shadow-13xl',
      18: 'bg-gray-500 dark:bg-gray-500 shadow-13xl dark:shadow-14xl',
      19: 'bg-gray-500 dark:bg-gray-500 shadow-14xl dark:shadow-15xl',
      20: 'bg-gray-500 dark:bg-gray-500 shadow-15xl dark:shadow-16xl',
      21: 'bg-gray-600 dark:bg-gray-400 shadow-16xl dark:shadow-17xl',
      22: 'bg-gray-600 dark:bg-gray-400 shadow-17xl dark:shadow-18xl',
      23: 'bg-gray-600 dark:bg-gray-400 shadow-18xl dark:shadow-19xl',
      24: 'bg-gray-700 dark:bg-gray-300 shadow-19xl dark:shadow-20xl',
    },
  },
  defaultVariants: {
    elevation: 2, // Default to elevation level 2
  },
});

type PaperVariantProps = VariantProps<typeof paperVariants>;

interface TypographyProps extends ViewProps, PaperVariantProps {}

const Typography = ({ className, elevation, ...props }: TypographyProps) => {
  return <View {...props} className={cn(paperVariants({ elevation }), className)} />;
};

export default Typography;
