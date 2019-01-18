import React, { Component } from "react";
import {
  changeCountry,
  changeCategory,
  getCategoryNews
} from "../../actions/headlineNewsActions";
import { connect } from "react-redux";
import { GridLoader } from "react-spinners";
import NewsCard from "../../components/NewsCard/NewsCard";
import "./News.scss";

class News extends Component {
  componentDidMount() {
    this.getNews();
  }

  componentDidUpdate(prevProps) {
    console.log("ROUTE CHANGED");
    console.log(
      "CURRENT",
      this.props.match.params.country,
      `PrevProps`,
      this.props.match.params.category
    );
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged(
        this.props.match.params.country,
        this.props.match.params.category
      );
    }
  }

  onRouteChanged(country, category) {
    this.props.onChangeCountry(country);
    this.props.onChangeCategory(category);
    this.getNews();
  }

  getNews = () => {
    this.props.onGetCategoryNews(
      this.props.match.params.country,
      this.props.match.params.category
    );
    console.log("staSte", this.props.categoryNews);
  };

  loadNews = () => {
    if (this.props.categoryNews.data === undefined) {
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
      <div className="news">
        {this.loadNews()}
        <GridLoader
          css={""}
          sizeUnit={"px"}
          size={25}
          color={"black"}
          loading={this.props.loading}
        />
        <button className="loadmore" onClick={() => console.log("loadmore")}>
          Load More Articles
        </button>
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
News = connecter(News);

export default News;
