import {
  CategoriesAction,
  CategoriesActionTypes,
  CategoriesState,
} from "../../types/categories-types";

const defaultState: CategoriesState = {
  count: 6,
};

const categoriesReducer = (
  state = defaultState,
  action: CategoriesAction
): CategoriesState => {
  switch (action.type) {
    case CategoriesActionTypes.SET_CATEGORIES_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
