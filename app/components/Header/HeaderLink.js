import styled from 'styled-components';
import { Link } from 'react-router';

const HeaderLink = styled(Link)`
  color: #D87800;
  font-family: Helvetica, Arial, sans-serif;
  &:hover {
    text-decoration: underline;
  }
`;

export default HeaderLink;