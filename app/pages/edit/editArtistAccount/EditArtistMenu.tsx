'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';
import { MdDelete } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ROUTE_PATHS } from '@/constants/routes';

interface EditArtistMenuProps {
  currentArtist: User | null;
}

const MenuContainer = styled.div`
  position: absolute;
  left: 2px;
  top: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin: 10px;
  padding: 0.5rem;
`;

const MenuElement = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  margin: 6px 8px 4px 0;
  padding: 0 4px;
  color: ${COLORS.gray};
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  font-size: 0.9rem;
  &:hover {
    font-weight: 700;
    color: ${COLORS.darkGray};
  }
`;

const EditArtistMenu = ({ currentArtist }: EditArtistMenuProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const refreshPage = () => {
    router.refresh();
  };

  const handleDeleteArtist = () => {
    setIsLoading(true);

    axios
      .delete(`/api/user/${currentArtist?.id}`)
      .then(() => {
        toast.success('Sanatçı sistemden silindi!');
        refreshPage();
      })
      .catch(() => {
        toast.error('Bir şeyler yanlış gitti');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const menuRef = useRef<HTMLDivElement>(null); // Specify the type of menuRef

  // Use useEffect to add a click event listener when the component mounts
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the menu and the menu is open, close it
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    // Add the event listener to 'document'
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
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
        <BsThreeDotsVertical />
      </div>
      {isOpen && (
        <MenuContainer>
          <div className='inline-flex flex-col cursor-pointer w-full '>
            <MenuElement
              onClick={() => {
                router.push(
                  `${ROUTE_PATHS.EDIT}${ROUTE_PATHS.EDIT_ARTIST_PROFILE}/${currentArtist?.id}`
                );
              }}
            >
              Sayfasını Düzenle
            </MenuElement>
            <MenuElement
              onClick={() => {
                handleDeleteArtist();
              }}
            >
              Sistemden Sil
              <MdDelete></MdDelete>
            </MenuElement>
          </div>
        </MenuContainer>
      )}
    </div>
  );
};

export default EditArtistMenu;
