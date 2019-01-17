const initialState = {
  headlines: "hi",
  country: "de",
  category: "general",
  categoryNews: {},
  loading: false
};

export default function headlinesReducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case "GET_HEADLINE_NEWS":
      newState = { ...state };
      newState.headlines = action.headlines;
      newState.loading = false;
      return newState;
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
      newState.categoryNews = action.categoryNews;
      newState.loading = false;
      return newState;
    case "LOADING":
      newState = { ...state };
      newState.loading = true;
      return newState;
    default:
      return state;
  }
}