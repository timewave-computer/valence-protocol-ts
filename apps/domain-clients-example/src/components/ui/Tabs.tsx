'use client';
import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/components/ui';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a TabsProvider');
  }
  return context;
};

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
}

export const Tabs = ({ children, defaultValue, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList = ({ children, className }: TabsListProps) => {
  return (
    <div className={cn('flex border-b border-gray-200 mb-4', className)}>
      {children}
    </div>
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
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2',
        'focus:outline-none ',
        isActive
          ? 'border-gray-900 text-gray-900 bg-gray-50'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        className
      )}
    >
      {children}
    </button>
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
  const { activeTab } = useTabsContext();

  if (activeTab !== value) {
    return null;
  }

  return <div className={cn('w-full', className)}>{children}</div>;
};
