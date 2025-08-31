'use client';
import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/components/ui';
import { ChevronDownIcon, CheckIcon } from '@radix-ui/react-icons';

interface SelectProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
}

export const Select = ({
  children,
  value,
  onValueChange,
  defaultValue,
  disabled,
  className,
}: SelectProps) => {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      {children}
    </SelectPrimitive.Root>
  );
};

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
  placeholder?: string;
}

export const SelectTrigger = ({
  children,
  className,
  placeholder,
}: SelectTriggerProps) => {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'flex h-8 w-full items-center justify-between rounded-sm border border-gray-300 bg-white px-2 py-1 text-xs font-mono',
        'focus:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:border-gray-400',
        className
      )}
    >
      <SelectPrimitive.Value placeholder={placeholder}>
        {children}
      </SelectPrimitive.Value>
      <SelectPrimitive.Icon>
        <ChevronDownIcon className='h-4 w-4 opacity-50' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectContent = ({ children, className }: SelectContentProps) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'relative z-50 min-w-[8rem] overflow-hidden rounded-sm border border-gray-200 bg-white shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
      >
        <SelectPrimitive.Viewport className='p-1'>
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const SelectItem = ({
  value,
  children,
  className,
  disabled,
}: SelectItemProps) => {
  return (
    <SelectPrimitive.Item
      value={value}
      disabled={disabled}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1 text-xs font-mono',
        'focus:bg-gray-100 focus:text-gray-900 focus:outline-none',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        'data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900',
        className
      )}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className='absolute right-2 flex h-3.5 w-3.5 items-center justify-center'>
        <CheckIcon className='h-3.5 w-3.5' />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
};

interface SelectLabelProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectSeparatorProps {
  className?: string;
}

export const SelectSeparator = ({ className }: SelectSeparatorProps) => {
  return (
    <SelectPrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-gray-200', className)}
    />
  );
};
