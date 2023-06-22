import styles from './user-order-feed.module.css';
import UserOrderShield from '../../components/user-order-shield/user-order-shield'
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookies';
import { startUserConnection, wsUserConnectionClosed } from '../../services/slices/webSocket-slice';


const UserOrderFeed = () => {
  const dispatch = useAppDispatch();
  const accessToken = getCookie('accessToken');
  const orders = useAppSelector((state) => state.wsUser.orders);

  useEffect(() => {
    if (accessToken) {
      dispatch(startUserConnection(accessToken));
    }
    return () => {
      dispatch(wsUserConnectionClosed());
    };
  }, [dispatch, accessToken]);

  const reversedOrders = orders ? [...orders].reverse() : [];

  return (
    <div className={styles.container}>
      {reversedOrders.map((order) => (
        <UserOrderShield key={order._id} order={order} />
      ))}
    </div>
  );
};

export default UserOrderFeed;