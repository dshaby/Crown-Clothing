import { createAction, Action, ActionWithPayload, withMatcher } from './../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";

// export const setCategories = (categoriesArray) =>
//   createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);


export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>
export const fetchCategoriesStart = withMatcher(() =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));
// no payload required, simply set isLoading to true;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>
export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  ));

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>
export const fetchCategoriesFailed = withMatcher((error: Error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));

// Before withMatcher: 
// export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed


// THUNK
// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categoriesArray = await getCategoriesAndDocuments("categories");
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// };
