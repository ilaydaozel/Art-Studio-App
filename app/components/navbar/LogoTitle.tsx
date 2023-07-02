'use client';
import React from 'react';

interface LogoTitleProps {
  children: React.ReactNode;
}

const LogoTitle = ({ children }: LogoTitleProps) => {
  return <div className='text-gray-800 text-xs font-semibold'>{children}</div>;
};

export default LogoTitle;
