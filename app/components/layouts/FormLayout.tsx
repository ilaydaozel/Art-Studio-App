import styled from 'styled-components';
import Button from '../buttons/Button';
import { COLORS } from '@/constants/colors';

interface FormLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onSubmit: () => void;
  actionLabel: string;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
  gap: 2rem;
  background-color: white;
`;

const TitleContainer = styled.div`
  text-align: center;
  h1 {
    font-size: 1.2rem;
    color: ${COLORS.darkGray};
    font-weight: bold;
  }
  h2 {
    font-size: 1rem;
    color: ${COLORS.gray};
  }
  @media (max-width: 576px) {
    h1 {
      font-size: 0.9rem;
    }
    h2 {
      font-size: 0.8rem;
    }
  }
`;
const BodyContainer = styled.div`
  width: 100%;
`;

const ButtonsContainer = styled.div`
  width: 100%;
`;
const FormLayout = ({
  title,
  subtitle,
  actionLabel,
  onSubmit,
  secondaryActionLabel,
  secondaryAction,
  children,
}: FormLayoutProps) => {
  return (
    <ModalContainer>
      <TitleContainer>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </TitleContainer>
      <BodyContainer>{children}</BodyContainer>

      <ButtonsContainer>
        {secondaryAction && secondaryActionLabel && (
          <Button
            label={secondaryActionLabel}
            onClick={secondaryAction}
            outline
          />
        )}
        <Button label={actionLabel} onClick={onSubmit} />
      </ButtonsContainer>
    </ModalContainer>
  );
};
export default FormLayout;
