import styled, { css } from "styled-components";
//화면 중앙 위치
export const Positioner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ShadowedBox = styled.div`
  width: 500px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const LogoWrapper = styled.div`
  background: #86af49;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Logo = styled.div`
  background: none;
  color: white;
  font-family: "Rajdhani";
  font-size: 2.4rem;
  letter-spacing: 5px;
  text-decoratipn: none;
`;
export const Contents = styled.div`
  background: white;
  padding: 2rem;
  height: auto;
`;
export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: black;
  margin-bottom: 1rem;
`;
