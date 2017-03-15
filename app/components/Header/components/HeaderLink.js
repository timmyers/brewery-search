import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

const HeaderLink = props => (
  <Link to={props.to}>
    <FlatButton style={{ color: 'white' }}>
      {props.children}
    </FlatButton>
  </Link>
);

export default HeaderLink;
