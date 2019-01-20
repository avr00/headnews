import React, { Component } from "react";
import "./Navbar.scss";
import { NavLink, Link } from "react-router-dom";
import {
  changeCountry,
  changeCategory,
  getCategoryNews
} from "../../actions/headlineNewsActions";
import { connect } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

class Navbar extends Component {
  state = {
    query: ""
  };
  handleChange = e => {
    this.setState({ query: e.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.history.push(`/q=${this.state.value}`);
  };

  render() {
    const { country } = this.props;
    return (
      <nav>
        <div className="navbar-top wow bounceIn">
          <h1>Magazine</h1>
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
              <NavLink to={`/de/${this.props.category}`}>Germany</NavLink>
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
