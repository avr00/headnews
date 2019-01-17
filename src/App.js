import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeCountry,
  changeCategory,
  getCategoryNews
} from "./actions/headlineNewsActions";
import { css } from "@emotion/core";
import { GridLoader } from "react-spinners";
import NewsCard from "./components/NewsCard/NewsCard";
import Navbar from "./components/Navbar/Navbar";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class App extends Component {
  async componentDidMount() {
    await this.getNews();
  }

  getNews = async () => {
    await this.props.onGetCategoryNews(this.props.country, this.props.category);
    await console.log("staSte", this.props.categoryNews);
  };

  loadNews = () => {
    if (this.props.categoryNews.data == undefined) {
      return "Hello";
    } else {
      return this.props.categoryNews.data.articles.map((article, index) => {
        return (
          <NewsCard
            key={index}
            author={article.author}
            description={article.description}
            published={article.publishedAt}
            source={article.source.name}
            title={article.title}
            url={article.url}
            urlToImage={article.urlToImage}
          />
        );
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <header
          className="App-header"
          style={{ width: "80%", margin: "0 auto", marginTop: "3rem" }}>
          <button onClick={() => this.props.onChangeCountry("ve")}>
            Change Country
          </button>
          <button onClick={() => this.props.onChangeCategory("general")}>
            Change Category
          </button>
          <button
            onClick={() =>
              this.props.onGetCategoryNews(
                this.props.country,
                this.props.category
              )
            }>
            Get Category News
          </button>
          <button
            onClick={() => console.log(this.props.categoryNews.data.articles)}>
            Category News
          </button>
          {this.loadNews()}

          <GridLoader
            css={""}
            sizeUnit={"px"}
            size={25}
            color={"black"}
            loading={this.props.loading}
          />
        </header>
      </div>
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
App = connecter(App);

export default App;
