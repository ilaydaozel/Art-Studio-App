'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import ArtworkContainer from '@/app/components/artwork/ArtworkContainer';
import { IArtistProfile, IUserArtwork } from '@/app/actions/type';
import ArtworkList from '@/app/components/artwork/ArtworkList';
import HeadingWithUnderline from '@/app/components/HeadingWithUnderline';

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

const ArtworksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledDivider = styled.div`
  width: 84%;
  border-top: 1px solid #e5e7eb;
  height: 1px;
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
            {profileInfo.user.name} {profileInfo.user.surname}
          </NameHeading>
        </div>
        <HeaderImage
          imageUrl={artworks ? artworks[0]?.artworkMedias[0] : ''}
        ></HeaderImage>
      </HeadingContainer>
      <LayoutContainer>
        <InformaionContainer>
          <HeadingWithUnderline title='Hakkında'></HeadingWithUnderline>
          <div className='flex items-center gap-10 mx-40 my-20'>
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
