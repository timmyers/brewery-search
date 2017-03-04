import styled from 'styled-components';

const HorizontalFlex = styled.div`
  display: flex;
  height: ${props => (
    props.height ? props.height : '100%'
  )};
  width: ${props => (
    props.width ? props.width : '100%'
  )};
  flex-direction: row;
  background-color: ${props => props.backgroundColor};
  position: relative;
  justify-content: center;
  align-items: center;
`;

export default HorizontalFlex;
