import styles from './feed-order-status-info.module.css'
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useEffect, useState } from 'react';
import { startConnection, wsConnectionClosed } from '../../services/slices/webSocket-slice';

const FeedOrderStatusInfo = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((store) => store.ws);
  const total = orders ? orders.total : null;
  const totalToday = orders ? orders.totalToday : null;
  const [newOrdersReady, setNewOrdersReady] = useState([]);
  const [newOrdersInProgress, setNewOrdersInProgress] = useState([]);

  useEffect(() => {
    dispatch(startConnection());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);

  useEffect(() => {
    if (orders && orders.orders) {
      const updatedOrdersReady = [];
      const updatedOrdersInProgress = [];

      for (let order of orders.orders) {
        if (order.status === 'done') {
          updatedOrdersReady.push(order);
        } else {
          updatedOrdersInProgress.push(order);
        }
      }

      setNewOrdersReady(updatedOrdersReady);
      setNewOrdersInProgress(updatedOrdersInProgress);
    }
  }, [orders]);

  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  const readyChunks = chunkArray(newOrdersReady, 10);
  const inProgressChunks = chunkArray(newOrdersInProgress, 10);


  return (
    <>
      <ul className={styles.section}>
        <li className={styles.container}>
          <div className={styles.status__box}>
            <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
            <div className={styles.column__container}>
              {readyChunks.map((chunk, index) => (
                <ul key={index} className={styles.column}>
                  {chunk.map((order) => {
                    return <li className={`${styles.status__ready} text text_type_digits-default`} key={order._id}>{order.number}</li>
                  })}
                </ul>
              ))}
            </div>
          </div>
          <div className={styles.status__box}>
            <h3 className="text text_type_main-medium mb-6">В работе:</h3>
            <div className={styles.column__container}>
              {inProgressChunks.map((chunk, key) => (
                <ul key={key} className={styles.column}>
                  {chunk.map((order) => {
                    return <li className="text text_type_digits-default" key={order._id}>{order.number}</li>
                  })}
                </ul>
              ))}
            </div>
          </div>
        </li>
        <li className={styles.total__box}>
          <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
          <p className={`${styles.digits} text text_type_digits-large`}>{total ? total.toLocaleString('ru-RU') : 0}</p>
        </li>
        <li className={styles.total__box}>
          <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
          <p className={`${styles.digits} text text_type_digits-large`}>{totalToday ? totalToday.toLocaleString('ru-RU') : 0}</p>
        </li>
      </ul >
    </>
  )
}

export default FeedOrderStatusInfo;