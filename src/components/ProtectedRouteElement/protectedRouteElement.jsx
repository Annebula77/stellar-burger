import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = ({ element }) => {
  const isLoggedIn = useSelector((store) => store.user.isAuthChecked);
  const authError = useSelector((store) => store.user.authError);

  if (!isLoggedIn || authError === 'You should be authorized') {
    return <Navigate to='/login' replace={true} />;
  }

  return element;
};

export default ProtectedRouteElement;