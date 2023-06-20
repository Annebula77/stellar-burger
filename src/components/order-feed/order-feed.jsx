import styles from './order-feed.module.css';
import OrderOverviewShield from '../../components/order-overview-shield/order-overview-shield';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startConnection, wsConnectionClosed } from '../../services/slices/webSocket-slice';



const OrderFeed = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ws.orders);

  useEffect(() => {
    dispatch(startConnection());
    return () => {
      dispatch(wsConnectionClosed());
    };

  }, []);

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

