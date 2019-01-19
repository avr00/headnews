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
import { animateScroll as scroll } from "react-scroll";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(faAngleUp);

class News extends Component {
  componentDidMount() {
    const { country, category } = this.props.match.params;
    this.onRouteChanged(country, category);
    //this.getNews();
    window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
    console.log(this.props);
  }

  componentWillUnmount() {
    // remove event listener
    window.removeEventListener("scroll", this.handleScroll, false);
  }

  componentDidUpdate(prevProps) {
    const { country, category } = this.props.match.params;

    if (this.props.location !== prevProps.location) {
      this.onRouteChanged(country, category);
    }
  }
  //Handle Infinite scroll
  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.getNews();
    }
  };

  onRouteChanged(country, category) {
    this.props.onResetNews();
    this.props.onChangeCountry(country);
    this.props.onChangeCategory(category);
    this.getNewsNewCategory();
  }

  getNews = () => {
    const { country, category } = this.props.match.params;
    const { pageSize, page } = this.props;
    if (this.props.hasMore === false) return;
    this.props.onFindMorePages();
    this.props.onGetCategoryNews(country, category, pageSize, page);
  };

  //load new category
  getNewsNewCategory = () => {
    const { country, category } = this.props.match.params;
    this.props.onFindMorePages();
    this.props.onGetCategoryNews(country, category, this.props.pageSize, 1);
  };

  loadNews = () => {
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
