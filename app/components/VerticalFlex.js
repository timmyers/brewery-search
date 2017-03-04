import styled from 'styled-components';

const VerticalFlex = styled.div`
  display: flex;
  height: ${props => (
    props.height ? props.height : '100%'
  )};
  width: ${props => (
    props.width ? props.width : '100%'
  )};
  flex-direction: column;
  background-color: ${props => props.backgroundColor};
  position: relative;
  justify-content: ${props => (
    props.justifyContent ? props.justifyContent : 'center'
  )};
  align-items: center;
  overflow: ${props => (
    props.scroll ? 'auto' : ''
  )};
`;

export default VerticalFlex;
