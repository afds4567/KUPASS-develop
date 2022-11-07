import styled from "styled-components";

const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const Label = styled.div`
  font-size: 1rem;
  color: #a2b9bc;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid grey;
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  type:${(props) => (props.type ? props.type : null)}
  ::placeholder {
    color: #e9ecef;
  }
`;

const InputWithLabel = ({ label, ...rest }) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input {...rest} />
    </Wrapper>
  );
};

export default InputWithLabel;
