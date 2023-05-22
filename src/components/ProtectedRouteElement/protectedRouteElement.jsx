import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = ({ element }) => {
  const isLoggedIn = useSelector((store) => store.user.isAuthChecked);
  const authError = useSelector((store) => store.user.authError);

  // Redirect if not logged in or if there was an authentication error
  if (!isLoggedIn || authError === 'You should be authorized') {
    return <Navigate to='/login' replace={true} />;
  }

  return element;
};

export default ProtectedRouteElement;