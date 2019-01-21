import React from "react";
import "./NewsCard.scss";
import newsDefault from "../../images/news-default.jpeg";
import PropTypes from "prop-types";

const NewsCard = props => {
  const { author, description, published, title, url, urlToImage } = props;
  return (
    <div className="card-container">
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${urlToImage || newsDefault})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      />
      <div className="card-content">
        <div className="card-title">
          <a href={url} target="_blank">
            <h2>{title}</h2>
          </a>
        </div>
        <div className="card-description">
          <p>{description}</p>
        </div>
        <div className="card-author">
          <h3>Author: {author}</h3>
        </div>
        <div className="card-date">
          <p>{published}</p>
        </div>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  author: PropTypes.string,
  description: PropTypes.string,
  published: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  urlToImage: PropTypes.string
};

export default NewsCard;
