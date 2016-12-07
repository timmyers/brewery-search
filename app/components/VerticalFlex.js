import styled from 'styled-components';

const VerticalFlex = styled.div`
  display: flex;
  width: ${props => props.width ? props.width : '100%'};
  height: ${props => props.height ? props.height : '100%'};
  flex-direction: column;
  background-color: ${props => props.backgroundColor};
  position: relative;
  justify-content: center;
  align-items: center;
`;

export default VerticalFlex;
