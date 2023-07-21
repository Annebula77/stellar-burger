import styles from './order-feed.module.css';
import OrderOverviewShield from '../order-overview-shield/order-overview-shield';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useEffect } from 'react';
import { startConnection, wsConnectionClosed } from '../../services/slices/webSocket-slice';


const OrderFeed = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.ws.orders);

  useEffect(() => {
    dispatch(startConnection());
    return () => {
      dispatch(wsConnectionClosed());
    };

  }, [dispatch]);

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

