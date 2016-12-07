import styled from 'styled-components';

const Input = styled.input`
  display: block;
  margin: 0;
  width: 100%;
  font-family: sans-serif;
  font-size: 18px;
  appearance: none;
  box-shadow: none;
  border-radius: none;
  width: ${props => props.width ? props.width : '100%'};
`;

export default Input;