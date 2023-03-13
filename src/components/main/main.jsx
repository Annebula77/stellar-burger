import styles from './main.module.css';

function Main(props) {
  return (
    <section className={styles.main}>
      {props.children}
    </section>
  )
}


export default Main;