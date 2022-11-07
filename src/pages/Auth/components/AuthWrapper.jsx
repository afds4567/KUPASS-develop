import {
  Contents,
  Logo,
  LogoWrapper,
  Positioner,
  ShadowedBox,
  Title,
} from "./AuthWrapperStyled";

export const AuthWrapper = ({ children, title }) => (
  <Positioner>
    <ShadowedBox>
      <LogoWrapper>
        <Logo to="/">KUPASS</Logo>
      </LogoWrapper>
      <Contents>
        <div>
          <Title>{title}</Title>
          {children}
        </div>
      </Contents>
    </ShadowedBox>
  </Positioner>
);
