import { styled } from 'styled-components';
import HeadingWithUnderline from '../heading/HeadingWithUnderline';

interface ListWithHeadingProps {
  headingText: string;
  children: React.ReactNode;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ListWithHeading = ({
  headingText = '',
  children,
}: ListWithHeadingProps) => {
  return (
    <ListContainer>
      <HeadingWithUnderline title={headingText}></HeadingWithUnderline>
      {children}
    </ListContainer>
  );
};
export default ListWithHeading;
