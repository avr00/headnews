import React from "react";
import PropTypes from "prop-types";
import "./Modal.scss";

const Modal = ({ show, handleClose, onChangeLanguage, onChangeSortBy }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {" "}
        <h3>Search Settings</h3>
        <form onSubmit={e => handleClose(e)}>
          <div onChange={event => onChangeSortBy(event.target.value)}>
            <h4>Sort By</h4>
            <input
              type="radio"
              value="publishedAt"
              name="sortby"
              defaultChecked
            />{" "}
            Newest
            <input type="radio" value="relevancy" name="sortby" /> Relevancy
            <input type="radio" value="popularity" name="sortby" /> Popularity
          </div>
          <div onChange={event => onChangeLanguage(event.target.value)}>
            <h4>Language</h4>
            <input
              type="radio"
              value="en"
              name="language"
              defaultChecked
            />{" "}
            English
            <input type="radio" value="es" name="language" /> Spanish
            <input type="radio" value="de" name="language" /> German
          </div>
          <button className="modal-btn">Save Settings</button>
        </form>
      </section>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  onChangeLanguage: PropTypes.func,
  onChangeSortBy: PropTypes.func
};

export default Modal;
