import { Link } from "react-router-dom";
import styled from "styled-components";

const Aligner = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

const StyledLink = styled(Link)`
  color: #a2b9bc;
  text-decoration: underline;
  &:hover {
    color: #dee2e6;
  }
`;

const RightLink = ({ to, children }) => (
  <Aligner>
    <StyledLink to={to}>{children}</StyledLink>
  </Aligner>
);

export default RightLink;
