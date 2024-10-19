import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ViewStyle, TextStyle } from 'react-native';

import { cn } from '@/utils/cn';

// Define button styles using cva
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white dark:bg-primary/90 dark:text-primary-foreground',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 dark:bg-destructive dark:text-destructive-foreground',
        outline:
          'border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white',
        secondary: 'bg-gray-200 text-black dark:bg-secondary dark:text-secondary-foreground',
        ghost: 'bg-transparent hover:bg-gray-100 dark:bg-transparent dark:hover:bg-gray-700',
        link: 'text-blue-600 underline dark:text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof buttonVariants> {
  asChild?: boolean; // For flexibility (can be used to render other components inside)
  children: React.ReactNode;
}

const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({ variant, size, style, className, children, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }), style as ViewStyle)} // Apply variants and any custom styles
        {...props}>
        <Text className={cn(buttonVariants({ variant, size, className }) as TextStyle)}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
