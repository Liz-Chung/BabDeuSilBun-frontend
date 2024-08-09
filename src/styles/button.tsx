import { useState } from 'react';

import styled from 'styled-components';

const mediaQueries = {
  mobile: `@media (max-width: var(--breakpoint-mobile-max))`,
  tablet: `@media (min-width: var(--breakpoint-tablet-min)) and (max-width: var(--breakpoint-tablet-max))`,
  desktop: `@media (min-width: var(--breakpoint-desktop))`,
};

const BaseButton = styled.button`
  width: 328px;
  height: 44px;
  background-color: var(--primary);
  color: white;
  border-radius: var(--border-radius-md);
  border: none;
  font-weight: var(--font-semi-bold);
  cursor: pointer;
  &:hover {
    background-color: var(--purple500);
  }
  &:active {
    background-color: var(--purple400);
    transform: scale(0.98);
  }
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 80%;
  }
  ${mediaQueries.desktop} {
    width: 328px;
  }
`;

const BaseBtn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
  ...props
}) => {
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <BaseButton onClick={onClick} {...props}>
      {children}
    </BaseButton>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};

const BaseButtonInactive = styled(BaseButton)`
  background-color: var(--gray300);
  color: white;
  &:hover {
    background-color: var(--gray400);
  }
  &:active {
    background-color: var(--gray500);
    transform: scale(0.98);
  }
`;

const BaseBtnInactive: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  /* eslint-disable react/jsx-props-no-spreading */
  return <BaseButtonInactive {...props}>{children}</BaseButtonInactive>;
  /* eslint-disable react/jsx-props-no-spreading */
};

const HalfButtonPurple = styled(BaseButton)`
  width: 136px;
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 50%;
  }
  ${mediaQueries.desktop} {
    width: 136px;
  }
`;

const HalfBtnPurple: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, onClick, ...props }) => {
  return (
    <HalfButtonPurple onClick={onClick} {...props}>
      {children}
    </HalfButtonPurple>
  );
};

const HalfButtonLight = styled(BaseButton)`
  width: 136px;
  background-color: var(--purple100);
  color: var(--primary);
  &:hover {
    background-color: var(--purple200);
  }
  &:active {
    background-color: var(--purple300);
    transform: scale(0.98);
  }
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 50%;
  }
  ${mediaQueries.desktop} {
    width: 136px;
  }
`;

const HalfBtnLight: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <HalfButtonLight onClick={onClick} {...props}>
      {children}
    </HalfButtonLight>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 281px;
  button {
    flex: 1;
  }
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 80%;
  }
  ${mediaQueries.desktop} {
    width: 328px;
  }
`;

const BtnGroup: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  return <ButtonGroup>{children}</ButtonGroup>;
};

const RoundButtonFilled = styled.button`
  width: 106px;
  height: 34px;
  background-color: var(--purple100);
  color: var(--text);
  border-radius: 21px;
  border: none;
  padding: 0.3rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: var(--purple200);
  }
  &:active {
    background-color: var(--purple300);
    transform: scale(0.98);
  }

  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 50%;
  }
  ${mediaQueries.desktop} {
    width: 106px;
  }
`;

const RoundBtnFilled: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, onClick, ...props }) => {
  return (
    <RoundButtonFilled onClick={onClick} {...props}>
      {children}
    </RoundButtonFilled>
  );
};

const SmallRoundButton = styled.button<{ isActive: boolean }>`
  width: 45px;
  height: 27px;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--primary)' : 'transparent'};
  color: ${({ isActive }) => (isActive ? 'white' : 'var(--gray300)')};
  border-radius: 15px;
  border: 1px solid var(--gray300);
  padding: 0.03rem 0.2rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--primary)' : 'var(--gray200)'};
  }
  &:active {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--primary)' : 'var(--gray100)'};
    transform: scale(0.98);
  }
  &:focus {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--primary)' : 'transparent'};
    color: ${({ isActive }) => (isActive ? 'white' : 'var(--gray300)')};
    border: ${({ isActive }) =>
      isActive ? 'none' : '1px solid var(--gray300)'};
  }
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 50%;
  }
  ${mediaQueries.desktop} {
    width: 45px;
  }
`;

const SmallRdBtn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <SmallRoundButton
      isActive={isActive}
      onClick={(e) => {
        handleClick();
        if (onClick) {
          onClick(e);
        }
      }}
      {...props}
    >
      {children}
    </SmallRoundButton>
  );
};

export {
  BaseBtn,
  BaseBtnInactive,
  HalfBtnPurple,
  HalfBtnLight,
  BtnGroup,
  RoundBtnFilled,
  SmallRdBtn,
};
