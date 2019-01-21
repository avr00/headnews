import React, { Component } from "react";
import "./Navbar.scss";
import { NavLink, Link } from "react-router-dom";
import {
  changeCountry,
  changeCategory,
  getCategoryNews,
  changeLanguage,
  changeSortBy
} from "../../actions/headlineNewsActions";
import { connect } from "react-redux";
import HamburgerMenu from "react-hamburger-menu";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";

library.add(faSearch, faSlidersH);

class Navbar extends Component {
  state = {
    query: "",
    open: false,
    show: false
  };
  handleChange = e => {
    this.setState({ query: e.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push(`/q=${this.state.value}`);
  };

  showModal = event => {
    event.preventDefault();
    this.setState({ show: true });
  };

  hideModal = event => {
    event.preventDefault();
    this.setState({ show: false });
  };

  render() {
    const { country } = this.props;
    return (
      <nav>
        <div className="navbar-top wow bounceIn">
          <div className="name-hamburger-container">
            <Link to={`/${this.props.country}/general`}>
              <h1>Headnews</h1>
            </Link>
            <div className="hamburger">
              <HamburgerMenu
                isOpen={this.state.open}
                menuClicked={() => this.setState({ open: !this.state.open })}
                width={35}
                height={35}
                strokeWidth={3}
                rotate={0}
                color="black"
                borderRadius={0}
                animationDuration={0.5}
              />
            </div>
          </div>

          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                type="text"
                name="name"
                value={this.state.query}
                onChange={this.handleChange}
                placeholder={"Search on Magazine"}
                required={true}
              />
            </label>
            <Link to={`/search/${this.state.query}`}>
              <button className="btn btn-primary">
                <FontAwesomeIcon size="1x" color="#999999" icon={"search"} />
              </button>
            </Link>
          </form>
        </div>
        <div
          className={`navbar-bottom ${
            this.state.open ? "active-hamburger" : ""
          }`}>
          <NavLink
            to={`/${country}/general`}
            className="category animated fadeInDown">
            Home
          </NavLink>
          <NavLink
            to={`/${country}/business`}
            className="category animated fadeInDown">
            Business
          </NavLink>
          <NavLink
            to={`/${country}/entertainment`}
            className="category animated fadeInDown">
            Entertainment
          </NavLink>
          <NavLink
            to={`/${country}/health`}
            className="category animated fadeInDown">
            Health
          </NavLink>
          <NavLink
            to={`/${country}/science`}
            className="category animated fadeInDown">
            Science
          </NavLink>
          <NavLink
            to={`/${country}/technology`}
            className="category animated fadeInDown">
            Technology
          </NavLink>
          <div className="dropdown category">
            <button className="dropbtn animated fadeInDown">Country ▼</button>
            <div className="dropdown-content">
              <NavLink to={`/us/${this.props.category}`}>US</NavLink>
              <NavLink to={`/gb/${this.props.category}`}>UK</NavLink>
              <NavLink to={`/ca/${this.props.category}`}>Canada</NavLink>
              <NavLink to={`/se/${this.props.category}`}>Sweden</NavLink>
              <NavLink to={`/no/${this.props.category}`}>Norway</NavLink>
              <NavLink to={`/de/${this.props.category}`}>Germany</NavLink>
            </div>
          </div>
          <button className="btn-modal" type="button" onClick={this.showModal}>
            <FontAwesomeIcon size="2x" color="#999999" icon={"sliders-h"} />
          </button>
        </div>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <h3>Search Settings</h3>
          <form onSubmit={e => this.hideModal(e)}>
            <div
              onChange={event => this.props.onChangeSortBy(event.target.value)}>
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
            <div
              onChange={event =>
                this.props.onChangeLanguage(event.target.value)
              }>
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
        </Modal>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    headlines: state.headlinesReducer.headlines,
    country: state.headlinesReducer.country,
    category: state.headlinesReducer.category,
    loading: state.headlinesReducer.loading,
    categoryNews: state.headlinesReducer.categoryNews
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeCountry: country => {
      dispatch(changeCountry(country));
    },
    onChangeCategory: category => {
      dispatch(changeCategory(category));
    },
    onGetCategoryNews: (country, category) => {
      dispatch(getCategoryNews(country, category));
    },
    onChangeLanguage: language => {
      dispatch(changeLanguage(language));
    },
    onChangeSortBy: sortBy => {
      dispatch(changeSortBy(sortBy));
    }
  };
};

const connecter = connect(
  mapStateToProps,
  mapDispatchToProps
);
Navbar = connecter(Navbar);

export default Navbar;
