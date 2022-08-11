import { fetchCategoriesStart, fetchCategoriesFailed, fetchCategoriesSuccess } from './categories.action';
import { Category } from './categories.types';
import { AnyAction } from 'redux';

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as AnyAction //before withMatcher: CategoryAction
): CategoriesState => {
  // const { type, payload } = action;
  // In TypeScript, no destructuring, because won't always receive a payload

  if(fetchCategoriesStart.match(action)) {
    return {...state, isLoading: true};
  }
  if (fetchCategoriesSuccess.match(action)) {
    return {...state, categories: action.payload, isLoading: false}
  }

  if (fetchCategoriesFailed.match(action)) {
    return {...state, error: action.payload, isLoading: false}
  }

  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     return {
  //       ...state,
  //       isLoading: true,
  //     };  

  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     return {
  //       ...state,
  //       categories: action.payload,
  //       isLoading: false,
  //     };

  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     return { ...state, error: action.payload, isLoading: false };

    // default:
      return state;
  // }
};
