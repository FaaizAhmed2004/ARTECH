import React from 'react';
import { cn } from '@/lib/utils';
import { LayoutProps } from '@/lib/types';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;