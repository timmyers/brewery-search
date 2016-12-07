import React from 'react'

import VerticalFlex from 'components/VerticalFlex';
import HorizontalFlex from 'components/HorizontalFlex';
import Header from 'components/Header';
import Footer from 'components/Footer';

const CoreLayout = ({ children }) => (
	<VerticalFlex>
    <VerticalFlex height='10%'>
      <Header />
    </VerticalFlex>
    <HorizontalFlex height='85%'>
      <HorizontalFlex width='70%'>
      	{children[0]}
      </HorizontalFlex>
      <HorizontalFlex width='30%' backgroundColor="#FAFAFA">
      	{children[1]}
      </HorizontalFlex>
    </HorizontalFlex>
    <VerticalFlex height='5%'>
      <Footer />
    </VerticalFlex>
  </VerticalFlex>
)

CoreLayout.propTypes = {
  children : React.PropTypes.array.isRequired
}

export default CoreLayout
