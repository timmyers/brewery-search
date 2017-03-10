import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

const HeaderLink = props => (
  <Link to={props.to}>
    <FlatButton>
      {props.children}
    </FlatButton>
  </Link>
);

export default HeaderLink;
