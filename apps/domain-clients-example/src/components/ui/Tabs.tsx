'use client';
import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/components/ui';

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
}

export const Tabs = ({ children, defaultValue, className }: TabsProps) => {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      className={cn('w-full', className)}
    >
      {children}
    </TabsPrimitive.Root>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList = ({ children, className }: TabsListProps) => {
  return (
    <TabsPrimitive.List
      className={cn('flex border-b border-gray-200 mb-4', className)}
    >
      {children}
    </TabsPrimitive.List>
  );
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsTrigger = ({
  value,
  children,
  className,
}: TabsTriggerProps) => {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2',
        'focus:outline-none',
        'data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 data-[state=active]:bg-gray-50',
        'data-[state=inactive]:border-transparent data-[state=inactive]:text-gray-500',
        'hover:text-gray-700 hover:border-gray-300',
        className
      )}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
};

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent = ({
  value,
  children,
  className,
}: TabsContentProps) => {
  return (
    <TabsPrimitive.Content value={value} className={cn('w-full', className)}>
      {children}
    </TabsPrimitive.Content>
  );
};
