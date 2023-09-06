'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IArtistProfile, IUserArtwork } from '@/app/[lang]/actions/type';
import ArtworkList from '@/app/[lang]/components/artwork/ArtworkList';
import HeadingWithUnderline from '@/app/[lang]/components/HeadingWithUnderline';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;
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
  width: 35%;
  height: auto;
  content: url(${(props) => props.imageUrl});

  @media (max-width: 768px) {
    width: 40%;
  }
  @media (max-width: 480px) {
    width: 50%;
  }
`;

const NameHeading = styled.text`
  font-size: 2.5rem;
  font-weight: 500;
  text-align: center;
  margin: 10px;
  color: ${COLORS.darkGray};
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const BiographyContent = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${COLORS.darkGray};
  word-break: break-all;
  padding: 10px 0;
`;

const InformaionContainer = styled.div`
  width: full;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArtworksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface ArtistProfileProps {
  profileInfo: IArtistProfile;
  artworks?: IUserArtwork[];
}

const ArtistProfile = ({ profileInfo, artworks }: ArtistProfileProps) => {
  return (
    <div>
      <HeadingContainer>
        <div className='flex justify-center items-center w-[50%] h-full'>
          <NameHeading>
            {profileInfo.user?.name} {profileInfo.user?.surname}
          </NameHeading>
        </div>
        <HeaderImage imageUrl={profileInfo?.coverImage || ''}></HeaderImage>
      </HeadingContainer>
      <LayoutContainer>
        <InformaionContainer>
          <HeadingWithUnderline title='Hakkında'></HeadingWithUnderline>
          <div className='flex items-center justify-center w-[80%] my-10 gap-10'>
            <ProfileImage
              imageUrl={profileInfo?.profilePic || ''}
            ></ProfileImage>
            <BiographyContent>{profileInfo?.biography}</BiographyContent>
          </div>
        </InformaionContainer>

        <ArtworksContainer>
          <HeadingWithUnderline title='Seçilmiş Eserler'></HeadingWithUnderline>
          <ArtworkList
            artworks={artworks ? artworks : null}
            width='90%'
          ></ArtworkList>
        </ArtworksContainer>
      </LayoutContainer>
    </div>
  );
};

export default ArtistProfile;
