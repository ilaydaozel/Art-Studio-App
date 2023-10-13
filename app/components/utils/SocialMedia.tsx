import { COLORS } from '@/constants/colors';
import { BsInstagram, BsFacebook } from 'react-icons/bs';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 1rem;
  a {
    font-size: 1.2rem;
    color: ${COLORS.lightGray};
  }
`;
const SocialMedia = () => {
  return (
    <>
      <Container>
        <a href='https://www.instagram.com/konaksanat_akademisi/'>
          <BsInstagram />
        </a>
        <a href='https://m.facebook.com/profile.php?id=100023734249933'>
          <BsFacebook />
        </a>
      </Container>
    </>
  );
};
export default SocialMedia;
