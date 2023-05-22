import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const ProtectedRouteElement = ({ element }) => {
  const isLoggedIn = useSelector((store) => store.user.isAuthChecked);

  return isLoggedIn ? element : <Navigate to='/login' replace={true} />;

}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRouteElement