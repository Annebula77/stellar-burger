import styles from './feed-order-status-info.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookies';
import { startWsConnection } from '../../services/actions/webSocket-actions';
import uniqid from 'uniqid';

const FeedOrderStatusInfo = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  const orders = useSelector((state) => state.ws.data);
  const total = orders ? orders.total : null;
  const totalToday = orders ? orders.totalToday : null;
  useEffect(() => {
    dispatch(startWsConnection('orders', accessToken));
  }, [dispatch, accessToken]);

  // Обрабатываем данные заказов и классифицируем их для отображения...
  const ordersReady = [];  // здесь будут готовые заказы
  const ordersInProgress = [];  // здесь будут заказы в процессе выполнения
  ordersReady.reverse();
  ordersInProgress.reverse();

  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }


  if (orders && orders.orders) {
    for (let order of orders.orders) {
      // Проверяем статус каждого заказа и классифицируем его
      // Примечание: Замените 'orderStatus' и 'ready' на свои конкретные поля и значения
      if (order.status === 'done') {
        ordersReady.push(order);
      } else {
        ordersInProgress.push(order);
      }
    }
  }
  const readyChunks = chunkArray(ordersReady, 10);
  const inProgressChunks = chunkArray(ordersInProgress, 10);

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
                    const key = uniqid();
                    return <li className={`${styles.status__ready} text text_type_digits-default`} key={key}>{order.number}</li>
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
                    const key = uniqid();
                    return <li className="text text_type_digits-default" key={key}>{order.number}</li>
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