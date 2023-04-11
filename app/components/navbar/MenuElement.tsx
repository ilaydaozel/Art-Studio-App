"use client";
import React from "react";
import Link from "next/link";

interface MenuElementProps {
  address: string;
  displayName: string;
}

const MenuElement: React.FC<MenuElementProps> = ({ address, displayName }) => {
  return (
    <div
      className="
      text-sm
        py-2
        px-4
        rounded-full
        hover:bg-neutral-100
        transition
        cursor-pointer"
    >
      <Link href={address}>{displayName}</Link>
    </div>
  );
};

export default MenuElement;
