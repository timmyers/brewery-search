import React from 'react';

import VerticalFlex from 'components/VerticalFlex';
import HorizontalFlex from 'components/HorizontalFlex';
import Header from 'components/Header';
import Footer from 'components/Footer';

const SimpleLayout = ({ children }) => (
  <VerticalFlex full>
    <Header />
    <HorizontalFlex fullWidth flexGrow={1}>
      {children}
    </HorizontalFlex>
    <Footer />
  </VerticalFlex>
);

SimpleLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default SimpleLayout;
