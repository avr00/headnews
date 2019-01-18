import axios from "axios";
const api = process.env.REACT_APP_NEWSAPI_KEY;

export const loading = () => {
  return {
    type: "LOADING"
  };
};

export const changeCountry = country => {
  return { type: "CHANGE_COUNTRY", country };
};

export const changeCategory = (category = "general") => {
  return { type: "CHANGE_CATEGORY", category };
};

export const getCategoryNewsAsync = categoryNews => {
  return { type: "GET_CATEGORY_NEWS", categoryNews };
};

export const getCategoryNews = (
  country = "us",
  category = "general",
  pagesLoaded = 1
) => {
  return dispatch => {
    dispatch(loading());
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${pagesLoaded}&apiKey=${api}`
      )
      .then(categoryNews => dispatch(getCategoryNewsAsync(categoryNews)));
  };
};
