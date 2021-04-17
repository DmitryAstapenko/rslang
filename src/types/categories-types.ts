export interface CategoriesState {
  count: number;
}

export enum CategoriesActionTypes {
  SET_CATEGORIES_COUNT = "SET_CATEGORIES_COUNT",
}
interface SetCategoriesAction {
  type: CategoriesActionTypes.SET_CATEGORIES_COUNT;
  payload: number;
}

export type CategoriesAction = SetCategoriesAction;
