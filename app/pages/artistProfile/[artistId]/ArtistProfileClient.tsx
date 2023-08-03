'use client';
import Image from 'next/image';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import ArtworkContainer from '@/app/components/artwork/ArtworkContainer';
import { UserArtwork } from '@prisma/client';

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;
const HeaderImage = styled.div<{ imageUrl: string }>`
  width: 50%;
  height: 100%;
  position: absolute;
  transform: translateX(100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.imageUrl});
`;
const ProfileImage = styled.img<{ imageUrl: string }>`
  width: 40%;
  height: auto;
  content: url(${(props) => props.imageUrl});
`;

const NameHeading = styled.text`
  font-size: 2.5rem;
  font-weight: 500;
  text-align: center;
  color: ${COLORS.darkGray};
`;

const SectionTitle = styled.div`
  width: 80%;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${COLORS.darkGray};
  text-align: left;
  margin: 2rem 0 0.25rem 0;
`;
const BiographyContent = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${COLORS.darkGray};
`;

const InformaionContainer = styled.div`
  width: full;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDivider = styled.div`
  width: 84%;
  border-top: 1px solid #e5e7eb;
  height: 1px;
`;
interface ArtistProfileProps {
  profileInfo?: any | null;
  artworks?: UserArtwork[] | null;
}

const ArtistProfile = ({ profileInfo, artworks }: ArtistProfileProps) => {
  return (
    <div>
      <div className='flex flex-col gap-10'>
        <HeadingContainer>
          <div className='flex justify-center items-center w-[50%] h-full'>
            <NameHeading>
              {profileInfo?.user.name} {profileInfo?.user.surname}
            </NameHeading>
          </div>
          <HeaderImage
            imageUrl={artworks ? artworks[0]?.artworkMedias[0] : ''}
          ></HeaderImage>
        </HeadingContainer>

        <InformaionContainer>
          <SectionTitle>Hakkında</SectionTitle>
          <StyledDivider />
          <div className='flex items-center gap-5 mx-40 my-20'>
            <ProfileImage
              imageUrl={profileInfo?.profilePic || ''}
            ></ProfileImage>
            <BiographyContent>{profileInfo?.biography}</BiographyContent>
          </div>
        </InformaionContainer>

        <div>
          <div className='flex flex-col items-center justify-center'>
            <SectionTitle>Seçilmiş Eserler</SectionTitle>
            <StyledDivider />
            <div className='flex w-full flex-wrap justify-around my-20'>
              {artworks?.map((currentArtwork: UserArtwork) => (
                <div
                  key={currentArtwork.id}
                  className='flex flex-col items-end'
                >
                  <ArtworkContainer artwork={currentArtwork}></ArtworkContainer>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
