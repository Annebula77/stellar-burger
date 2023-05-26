import styles from './feed-page.module.css';
const FeedPage = () => {
  return (
    <section className={styles.section}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Лента заказов</h2>
      <div className={styles.orders__section}>
        <div className={styles.orders__container}></div>
      </div>
      <ul className={styles.list__section}>
        <li className={styles.list__container}>
          <div className={styles.status__box}>
            <h3>Готовы:</h3>
          </div>
          <div className={styles.status__box}>
            <h3>В работе:</h3>
          </div>
        </li>
        <li className={styles.total__box}>
          <h3>Выполнено за все время:</h3>
          <p>123455</p>
        </li>
        <li className={styles.total__box}>
          <h3>Выполнено за сегодня:</h3>
          <p>123455</p>
        </li>
      </ul>

    </section>
  )

}
export { FeedPage };