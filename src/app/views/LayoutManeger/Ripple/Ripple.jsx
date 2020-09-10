import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RippleStyles from './RippleStyles';

const Ripple = ({ className }) => (
  <div  style={{
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'center',
  }}>
    <div className={className}>
      <div />
      <div />
    </div>
  </div>
);
Ripple.propTypes = {
  className: PropTypes.string,
};

const StyledRipple = styled(Ripple)`
  ${RippleStyles}
`;
export default StyledRipple;
