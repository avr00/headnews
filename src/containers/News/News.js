import React, { Component } from "react";
import {
  changeCountry,
  changeCategory,
  getCategoryNews,
  resetNews,
  findMorePages
} from "../../actions/headlineNewsActions";
import { connect } from "react-redux";
import { GridLoader } from "react-spinners";
import NewsCard from "../../components/NewsCard/NewsCard";
import "./News.scss";

class News extends Component {
  componentDidMount() {
    this.getNews();
    window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  componentWillUnmount() {
    // remove event listener
    window.removeEventListener("scroll", this.handleScroll, false);
  }

  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.getNews();
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged(
        this.props.match.params.country,
        this.props.match.params.category
      );
    }
  }

  onRouteChanged(country, category) {
    this.props.onResetNews();
    this.props.onChangeCountry(country);
    this.props.onChangeCategory(category);
    this.getNewsNewCategory();
  }

  getNews = () => {
    if (this.props.hasMore === false) return;
    this.props.onFindMorePages();
    console.log("DID U FIND MORE PAGES?", this.props.hasMore);
    this.props.onGetCategoryNews(
      this.props.match.params.country,
      this.props.match.params.category,
      this.props.pageSize,
      this.props.page
    );
  };

  getNewsNewCategory = () => {
    this.props.onFindMorePages();
    this.props.onGetCategoryNews(
      this.props.match.params.country,
      this.props.match.params.category,
      this.props.pageSize,
      1
    );
  };

  loadNews = () => {
    if (this.props.categoryNews.data.articles === undefined) {
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
    categoryNews: state.headlinesReducer.categoryNews,
    pageSize: state.headlinesReducer.pageSize,
    page: state.headlinesReducer.page,
    hasMore: state.headlinesReducer.hasMore
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
    onGetCategoryNews: (country, category, pageSize, page) => {
      dispatch(getCategoryNews(country, category, pageSize, page));
    },
    onResetNews: () => {
      dispatch(resetNews());
    },
    onFindMorePages: () => {
      dispatch(findMorePages());
    }
  };
};

const connecter = connect(
  mapStateToProps,
  mapDispatchToProps
);
News = connecter(News);

export default News;
