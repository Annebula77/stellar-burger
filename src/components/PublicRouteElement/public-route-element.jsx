import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRouteElement = ({ element }) => {
  const isLoggedIn = useSelector((store) => store.user.isAuthChecked);

  return isLoggedIn ? <Navigate to='/' replace={true} /> : element;
}

PublicRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PublicRouteElement;