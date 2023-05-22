import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRouteElement = ({ element }) => {
  const isLoggedIn = useSelector((store) => store.user.isAuthChecked);

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />
  }

  return element;
}

PublicRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PublicRouteElement;