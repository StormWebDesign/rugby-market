import PropTypes from 'prop-types';

const Wrapper = ({ children }) => {
  return <>{children}</>;
};

Wrapper.propTypes = {
  children: PropTypes.node,
};

export default Wrapper;
