'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { COLORS } from '@/constants/colors';

interface EditMenuProps {
  onEditClick?: () => void;
  onDeleteClick: () => void;
}

const MenuContainer = styled.div`
  position: absolute;
  left: 2px;
  top: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  overflow: hidden;
  margin: 10px;
  padding: 0.5rem;
`;

const MenuElement = styled.a<{ warning?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  margin: 6px 8px 4px 0;
  padding: 0 4px;
  color: ${(props) => (props.warning ? COLORS.red : COLORS.gray)};
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  font-size: 0.9rem;
  &:hover {
    font-weight: 700;
    color: ${(props) => (props.warning ? COLORS.red : COLORS.darkGray)};
  }
`;

const EditMenu = ({ onEditClick, onDeleteClick }: EditMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className='relative' ref={menuRef}>
      <div
        onClick={toggleOpen}
        className='
          flex 
          flex-row 
          items-center 
          justify-center
          cursor-pointer 
          gap-1
          '
      >
        <BsThreeDotsVertical style={{ color: `${COLORS.darkGray}` }} />
      </div>
      {isOpen && (
        <MenuContainer>
          <div className='inline-flex flex-col cursor-pointer w-full '>
            {onEditClick && (
              <MenuElement
                onClick={() => {
                  onEditClick();
                }}
              >
                Düzenle
              </MenuElement>
            )}
            <MenuElement
              warning
              onClick={() => {
                onDeleteClick();
              }}
            >
              Sil
            </MenuElement>
          </div>
        </MenuContainer>
      )}
    </div>
  );
};

export default EditMenu;
