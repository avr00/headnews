const initialState = {
  headlines: "hi",
  country: "us",
  category: "general",
  categoryNews: { data: { totalResults: null, articles: [] } },
  loading: false,
  pageSize: 10,
  page: 1,
  totalPages: null,
  hasMore: true,
  query: "bitcoin"
};

export default function headlinesReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case "CHANGE_COUNTRY":
      newState = { ...state };
      newState.country = action.country;
      return newState;
    case "CHANGE_CATEGORY":
      newState = { ...state };
      newState.category = action.category;
      return newState;
    case "GET_CATEGORY_NEWS":
      newState = { ...state };
      newState.page = newState.page + 1;
      newState.totalPages = Math.ceil(
        action.categoryNews.data.totalResults / newState.pageSize
      );
      //get total results
      newState.categoryNews.data.totalResults =
        action.categoryNews.data.totalResults;
      //concat new data
      newState.categoryNews.data.articles = [
        ...newState.categoryNews.data.articles,
        ...action.categoryNews.data.articles
      ];
      //set loading to false
      newState.loading = false;
      return newState;
    case "LOADING":
      newState = { ...state };
      newState.loading = true;
      return newState;
    case "LOAD_MORE":
      newState = { ...state };
      newState.page = newState.page + 1;
      return newState;
    case "RESET_NEWS":
      newState = { ...state };
      newState.hasMore = true;
      newState.page = 1;
      newState.totalPages = null;
      newState.categoryNews.data.articles = [];
      return newState;
    case "FIND_MORE_PAGES":
      newState = { ...state };
      if (
        newState.totalPages !== null &&
        newState.totalPages <= newState.page
      ) {
        newState.hasMore = false;
        return newState;
      }
      return newState;
    case "GET_SEARCH":
      newState = { ...state };
      newState.page = newState.page + 1;
      newState.totalPages = Math.ceil(
        action.results.data.totalResults / newState.pageSize
      );
      //get total results
      newState.categoryNews.data.totalResults =
        action.results.data.totalResults;
      //concat new data
      newState.categoryNews.data.articles = [
        ...newState.categoryNews.data.articles,
        ...action.results.data.articles
      ];
      newState.loading = false;
      console.log("RESULTS", action.results);
      return newState;
    default:
      return state;
  }
}
