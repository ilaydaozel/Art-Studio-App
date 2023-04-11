"use client";
import React from "react";

interface LogoTitleProps {
  children: React.ReactNode;
}

const LogoTitle: React.FC<LogoTitleProps> = ({ children }) => {
  return <div className="text-gray-800 text-xs font-semibold">{children}</div>;
};

export default LogoTitle;
