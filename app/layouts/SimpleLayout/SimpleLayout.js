import React from 'react'

import VerticalFlex from 'components/VerticalFlex';
import HorizontalFlex from 'components/HorizontalFlex';
import Header from 'components/Header';
import Footer from 'components/Footer';

const SimpleLayout = ({ children }) => (
	<VerticalFlex>
    <VerticalFlex height='10%'>
      <Header />
    </VerticalFlex>
    <HorizontalFlex height='85%'>
      {children}
    </HorizontalFlex>
    <VerticalFlex height='5%'>
      <Footer />
    </VerticalFlex>
  </VerticalFlex>
)

SimpleLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default SimpleLayout
