import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';
import { FC } from 'react';
import { RouteElementProps } from '../../utils/essentials'


const ProtectedRouteElement: FC<RouteElementProps> = ({ element }) => {
  const isLoggedIn = useAppSelector((store) => store.user.user !== null);
  const authError = useAppSelector((store) => store.user.authError);

  if (!isLoggedIn || authError?.message === 'You should be authorized') {
    return <Navigate to='/login' replace={true} />;
  }

  return <>{element}</>;
};


export default ProtectedRouteElement;