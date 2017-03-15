import React from 'react';

import Header from './Header';
import Holder from './Holder';

const TitledBox = ({ title, children }) => (
  <Holder>
    <Header title={title} />
    {children}
  </Holder>
);

export default TitledBox;
