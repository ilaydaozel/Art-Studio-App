import React from "react";

interface MenuContainerProps {
  children: React.ReactNode;
}

const MenuContainer: React.FC<MenuContainerProps> = ({ children }) => {
  return (
    <div
      className="
      flex
      flex-row
      items-center
      justify-between
      gap-3
      md:gap-0"
    >
      {children}
    </div>
  );
};

export default MenuContainer;
