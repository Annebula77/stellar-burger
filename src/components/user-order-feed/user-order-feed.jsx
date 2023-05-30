import styles from './user-order-feed.module.css';
import UserOrderShield from '../../components/user-order-shield/user-order-shield'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookies';
import { startWsConnection, wsConnectionClosed } from '../../services/actions/webSocket-actions';


const UserOrderFeed = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  const orders = useSelector((state) => state.wsUser.data?.orders);

  useEffect(() => {
    dispatch(startWsConnection('user', accessToken));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);

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
