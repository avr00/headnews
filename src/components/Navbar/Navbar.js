import React, { Component } from "react";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import {
  changeCountry,
  changeCategory,
  getCategoryNews
} from "../../actions/headlineNewsActions";
import { connect } from "react-redux";

class Navbar extends Component {
  render() {
    const { country } = this.props;
    return (
      <nav>
        <div className="navbar-top wow bounceIn">
          <h1>Magazine</h1>
        </div>
        <div className="navbar-bottom">
          <NavLink to={`/${country}/general`} className="category">
            Home
          </NavLink>
          <NavLink to={`/${country}/business`} className="category">
            Business
          </NavLink>
          <NavLink to={`/${country}/entertainment`} className="category">
            Entertainment
          </NavLink>
          <NavLink to={`/${country}/health`} className="category">
            Health
          </NavLink>
          <NavLink to={`/${country}/science`} className="category">
            Science
          </NavLink>
          <NavLink to={`/${country}/technology`} className="category">
            Technology
          </NavLink>
          <div className="dropdown category">
            <button className="dropbtn">Country ▼</button>
            <div className="dropdown-content">
              <NavLink to={`/us/${this.props.category}`}>US</NavLink>
              <NavLink to={`/gb/${this.props.category}`}>UK</NavLink>
              <NavLink to={`/ca/${this.props.category}`}>Canada</NavLink>
              <NavLink to={`/se/${this.props.category}`}>Sweden</NavLink>
              <NavLink to={`/no/${this.props.category}`}>Norway</NavLink>
              <NavLink to={`/de`}>Germany</NavLink>
            </div>
          </div>
        </div>
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
    }
  };
};

const connecter = connect(
  mapStateToProps,
  mapDispatchToProps
);
Navbar = connecter(Navbar);

export default Navbar;
