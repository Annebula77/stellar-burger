import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';
import PropTypes from 'prop-types';

const ProtectedRouteElement = ({ element }) => {
  const isLoggedIn = useAppSelector((store) => store.user.user !== null);
  const authError = useAppSelector((store) => store.user.authError);

  if (!isLoggedIn || authError?.message === 'You should be authorized') {
    return <Navigate to='/login' replace={true} />;
  }

  return element;
};
ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
}

export default ProtectedRouteElement;