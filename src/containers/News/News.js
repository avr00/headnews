import React, { Component } from "react";
import {
  changeCountry,
  changeCategory,
  getCategoryNews,
  resetNews,
  findMorePages,
  getSearchNews
} from "../../actions/headlineNewsActions";
import { connect } from "react-redux";
import { GridLoader } from "react-spinners";
import NewsCard from "../../components/NewsCard/NewsCard";
import "./News.scss";
import { animateScroll as scroll } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
  componentDidMount() {
    const { country, category } = this.props.match.params;
    this.onRouteChanged(country, category);
    this.getNews();
  }

  componentDidUpdate(prevProps) {
    const { country, category } = this.props.match.params;

    if (this.props.location !== prevProps.location) {
      this.onRouteChanged(country, category);
    }
  }

  onRouteChanged(country, category) {
    //console.log(this.props);
    this.props.onResetNews();
    if (this.props.match.params.country) {
      this.props.onChangeCountry(country);
      this.props.onChangeCategory(category);
    }
    this.getNewsNewCategory();
  }

  getNews = () => {
    const { country, category, query } = this.props.match.params;
    const { pageSize, page, language, sortBy } = this.props;
    if (this.props.hasMore === false) return;
    this.props.onFindMorePages();

    if (country) {
      this.props.onGetCategoryNews(country, category, pageSize, page);
    } else {
      this.props.onGetSearchNews(query, language, sortBy, pageSize, page);
    }
  };

  //load new category
  getNewsNewCategory = () => {
    const { country, category, query } = this.props.match.params;
    this.props.onFindMorePages();
    if (country) {
      this.props.onGetCategoryNews(country, category, this.props.pageSize, 1);
    } else {
      this.props.onGetSearchNews(
        query,
        this.props.language,
        this.props.sortBy,
        this.props.pageSize,
        1
      );
    }
  };

  loadNews = () => {
    const { articles } = this.props.categoryNews.data;
    if (articles.length === 0 && this.props.loading === false) {
      return <h2>Oops, sorry we couldn't find anything :(</h2>;
    }
    return articles.map((article, index) => {
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
  };

  render() {
    const { articles } = this.props.categoryNews.data;
    return (
      <div className="news">
        <InfiniteScroll
          dataLength={articles.length}
          next={this.getNews}
          hasMore={this.props.hasMore}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
          {this.loadNews()}
        </InfiniteScroll>
        <GridLoader
          css={""}
          sizeUnit={"px"}
          size={25}
          color={"black"}
          loading={this.props.loading}
        />
        {this.props.hasMore ? (
          ""
        ) : (
          <>
            <h2 className="bottom">
              It seems you're up to date with this section!
            </h2>
            <div
              onClick={() => scroll.scrollToTop()}
              className="scroll-top animated infinite bounce delay-2s">
              <FontAwesomeIcon size="3x" color="black" icon={"angle-up"} />
              <span>To Top!</span>
            </div>
          </>
        )}
      </div>
    );
  }
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  loading: PropTypes.bool,
  categoryNews: PropTypes.object,
  pageSize: PropTypes.number,
  page: PropTypes.number,
  hasMore: PropTypes.bool,
  query: PropTypes.string,
  sortBy: PropTypes.string,
  onChangeCategory: PropTypes.func,
  onChangeCountry: PropTypes.func,
  onGetCategoryNews: PropTypes.func,
  onResetNews: PropTypes.func,
  onFindMorePages: PropTypes.func,
  onGetSearchNews: PropTypes.func
};

const mapStateToProps = state => {
  return {
    country: state.headlinesReducer.country,
    category: state.headlinesReducer.category,
    loading: state.headlinesReducer.loading,
    categoryNews: state.headlinesReducer.categoryNews,
    pageSize: state.headlinesReducer.pageSize,
    page: state.headlinesReducer.page,
    hasMore: state.headlinesReducer.hasMore,
    query: state.headlinesReducer.query,
    language: state.headlinesReducer.language,
    sortBy: state.headlinesReducer.sortBy
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
    },
    onGetSearchNews: (query, language, sortBy, pageSize, page) => {
      dispatch(getSearchNews(query, language, sortBy, pageSize, page));
    }
  };
};

const connecter = connect(
  mapStateToProps,
  mapDispatchToProps
);
News = connecter(News);

export default News;
