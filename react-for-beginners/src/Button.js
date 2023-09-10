import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ text, onClick }) {
  console.log("Button Rendered!");

  return (
    <button className={styles.btn} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
