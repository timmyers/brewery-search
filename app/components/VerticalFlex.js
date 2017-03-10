import styled from 'styled-components';

const VerticalFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${(props) => {
    let ret = '';
    if (props.full || props.fullHeight) {
      ret += 'height: 100%;';
    }
    if (props.full || props.fullWidth) {
      ret += 'width: 100%;';
    }
    if (props.height) {
      ret += `height: ${props.height};`;
    }
    if (props.width) {
      ret += `width: ${props.width};`;
    }
    if (props.backgroundColor) {
      ret += `background-color: ${props.backgroundColor};`;
    }
    if (props.scroll) {
      ret += 'overflow-y: auto;';
    }
    if (props.flexGrow) {
      ret += `flex-grow: ${props.flexGrow};`;
    }
    return ret;
  }};
  justify-content: ${props => (
    props.justifyContent ? props.justifyContent : 'center'
  )};
  position: ${props => (
    props.position ? props.position : 'relative'
  )};
`;

export default VerticalFlex;
