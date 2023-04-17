import PropTypes from 'prop-types';
import styles from './main.module.css'

function Main(props) {
  return (
    <main className={styles.main}>
      {props.children}
    </main>
  )
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Main;