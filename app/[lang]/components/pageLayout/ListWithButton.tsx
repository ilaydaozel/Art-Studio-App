import { styled } from 'styled-components';
import SlidingButton from '../buttons/SlidingButton';

interface ListWithButtonProps {
  buttonText: string;
  onClick: () => void;
  children: React.ReactNode;
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 84%;
`;

const ListWithButton = ({
  buttonText = '',
  onClick,
  children,
}: ListWithButtonProps) => {
  return (
    <ListContainer>
      <ButtonContainer>
        <SlidingButton
          label={buttonText}
          onClick={() => onClick()}
        ></SlidingButton>
      </ButtonContainer>
      {children}
    </ListContainer>
  );
};
export default ListWithButton;
