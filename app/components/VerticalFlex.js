import styled from 'styled-components';

const VerticalFlex = styled.div`
  display: flex;
  width: 100%;
  height: ${props => props.height ? props.height : '100%'};
  flex-direction: column;
  background-color: ${props => props.backgroundColor};
  position: relative;
`;

export default VerticalFlex;
