import styles from './order-feed.module.css';
import OrderOverviewShield from '../../components/order-overview-shield/order-overview-shield';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookies';
import { startWsConnection } from '../../services/actions/webSocket-actions';

const OrderFeed = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  const orders = useSelector((state) => state.ws.data?.orders);

  useEffect(() => {
    dispatch(startWsConnection('orders', accessToken));
  }, [dispatch, accessToken]);

  return (
    <div className={styles.container}>
      {orders &&
        orders.map((order) => (
          <OrderOverviewShield key={order._id} order={order} />
        ))}
    </div>
  );
};

export default OrderFeed;

