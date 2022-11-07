import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;

  background: #86af49;
  color: white;

  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
  transition: 0.2s all;
  &:hover {
    background: #d5e1df;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  &:active {
    background: #878f99;
  }
`;

const Button = ({ children, onClick }) => (
  <Wrapper onClick={onClick}>{children}</Wrapper>
);

export default Button;
