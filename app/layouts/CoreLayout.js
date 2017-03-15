import React from 'react';

import VerticalFlex from 'components/VerticalFlex';
import HorizontalFlex from 'components/HorizontalFlex';
import Header from 'components/Header';
import Footer from 'components/Footer';

const CoreLayout = ({ children }) => (
  <VerticalFlex full>
    <Header />
    <HorizontalFlex fullWidth flexGrow={1}>
      <HorizontalFlex full position="absolute">
        <HorizontalFlex fullHeight width="70%">
          {children[0]}
        </HorizontalFlex>
        <HorizontalFlex fullHeight width="30%">
          {children[1]}
        </HorizontalFlex>
      </HorizontalFlex>
    </HorizontalFlex>
    <Footer />
  </VerticalFlex>
);

CoreLayout.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
};

export default CoreLayout;
