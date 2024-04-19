import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from "../categories.action"
import { CATEGORIES_INITIAL_STATE, CategoriesState, categoriesReducer } from "../categories.reducer"
import { mockCategoriesData } from "../mocks";

describe('Category Reducer tests', () => {
    test('fetchCategoriesStart makes isLoading true', () => {
        const expectedState: CategoriesState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: true
        }

        const stateResult = categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart());
        expect(stateResult).toEqual(expectedState);
    });

    test('fetchCategoriesSuccess makes isLoading false and returns mockData', () => {
        

        const expectedState: CategoriesState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            categories: mockCategoriesData
        }

        const nextState = categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockCategoriesData));
        expect(nextState).toEqual(expectedState);
    });

    test('fetchCategoriesFailed returns err and isLoading false', () => {
        const mockError = new Error('Err fetching categories');

        const expectedState: CategoriesState = {
             ...CATEGORIES_INITIAL_STATE,
             isLoading: false,
             error: mockError
        }

        const nextState = categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesFailed(mockError));
        expect(nextState).toEqual(expectedState);
    });
});