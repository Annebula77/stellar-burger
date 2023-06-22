import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';

const PublicRouteElement = ({ element }) => {
  const isLoggedIn = useAppSelector((store) => store.user.user !== null);

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />
  }

  return element;
}

PublicRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PublicRouteElement;