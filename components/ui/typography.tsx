import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { Text, TextProps } from 'react-native';

import { cn } from '@/utils/cn';

// Define text color variants for light and dark mode
export const typographyVariants = cva('', {
  variants: {
    color: {
      default: 'text-black dark:text-white',
      secondary: 'text-gray-500 dark:text-gray-400',
    },
  },
  defaultVariants: {
    color: 'default', // Default text color is black
  },
});

type TypographyVariantProps = VariantProps<typeof typographyVariants>;

interface TypographyProps extends TextProps, TypographyVariantProps {}

const Typography = ({ className, color, ...props }: TypographyProps) => {
  return <Text {...props} className={cn(typographyVariants({ color }), className)} />;
};

export default Typography;
