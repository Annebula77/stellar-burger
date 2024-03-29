
import styles from './feed-page.module.css';
import FeedOrderStatusInfo from '../../components/feed-order-status-info/feed-order-status-info';
import OrderFeed from '../../components/order-feed/order-feed';

const FeedPage = () => {

  return (
    <section className={styles.section}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Лента заказов</h2>
      <div className={styles.wrap}>
        <div className={styles.orders__section}>
          <div className={styles.orders__container}>
            <OrderFeed />
          </div>
        </div>
        <FeedOrderStatusInfo />
      </div>
    </section>
  );
};

export { FeedPage };