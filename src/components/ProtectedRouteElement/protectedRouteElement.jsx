import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRouteElement = ({ element }) => {
  const isLoggedIn = useSelector((store) => store.user.user !== null);
  const authError = useSelector((store) => store.user.authError);

  if (!isLoggedIn || authError?.message === 'You should be authorized') {
    return <Navigate to='/login' replace={true} />;
  }

  return element;
};
ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
}

export default ProtectedRouteElement;