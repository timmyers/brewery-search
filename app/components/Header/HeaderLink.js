import styled from 'styled-components';
import { Link } from 'react-router';

const HeaderLink = styled(Link)`
  color: #D87800;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 24px;
  text-decoration: none;
  margin: 0px 8px;
  &:hover {
    text-decoration: underline;
  }
`;

export default HeaderLink;