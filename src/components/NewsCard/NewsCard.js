import React from "react";
import "./NewsCard.scss";
import newsDefault from "../../images/news-default.jpeg";

const NewsCard = props => {
  const { author, description, published, title, url, urlToImage } = props;
  return (
    <div className="card-container">
      <div className="card-image">
        <img src={urlToImage || newsDefault} alt="news url" />
      </div>
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

export default NewsCard;
