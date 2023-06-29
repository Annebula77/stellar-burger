import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';
import { FC } from 'react';
import { RouteElementProps } from '../../utils/essentials'

const PublicRouteElement: FC<RouteElementProps> = ({ element }) => {
  const isLoggedIn = useAppSelector((store) => store.user.user !== null);

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />
  }

  return <>{element}</>;
}


export default PublicRouteElement;