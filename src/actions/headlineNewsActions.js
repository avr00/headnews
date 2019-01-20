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

export const resetNews = () => {
  return { type: "RESET_NEWS" };
};

export const getCategoryNewsAsync = categoryNews => {
  return { type: "GET_CATEGORY_NEWS", categoryNews };
};

export const getCategoryNews = (
  country = "us",
  category = "general",
  pageSize = 2,
  page = 1
) => {
  return dispatch => {
    dispatch(loading());
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${api}`
      )
      .then(categoryNews => dispatch(getCategoryNewsAsync(categoryNews)))
      .catch(err => console.error(err));
  };
};

export const findMorePages = () => {
  return { type: "FIND_MORE_PAGES" };
};

export const getSearchNews = (
  query = "venezuela",
  language = "es",
  sortBy = "popularity",
  pageSize = 5,
  page = 3
) => {
  return dispatch => {
    dispatch(loading());
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${query}&language=${language}&sortBy=${sortBy}&pageSize=${pageSize}&page=${page}&apiKey=67df4670e41048a6bb95a8a772701902`
      )
      .then(results => dispatch(getSearchNewsAsync(results)))
      .catch(err => console.error(err));
  };
};
export const getSearchNewsAsync = results => {
  return { type: "GET_SEARCH", results };
};
