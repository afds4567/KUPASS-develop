import React from 'react'
import styled, { keyframes } from 'styled-components';

const transitions = {
  shake: keyframes`
      0% {
          transform: translate(-30px);
      }
      25% {
          transform: translate(15px);
      }
      50% {
          transform: translate(-10px);
      }
      75% {
          transform: translate(5px);
      }
      100% {
          transform: translate(0px);
      }
  `
};

const Wrapper = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: red;
    font-weight: 500;
    //text-align: center;
    animation: ${transitions.shake} 0.3s ease-in;
    animation-fill-mode: forwards;
`;

export default function AuthError({children}) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
    
  )
}
