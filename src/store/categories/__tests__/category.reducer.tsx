import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from "../categories.action"
import { CATEGORIES_INITIAL_STATE, CategoriesState, categoriesReducer } from "../categories.reducer"
import { Category } from "../categories.types";

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
        const mockData: Category[] = [
            {
                title: 'mens',
                imageUrl: 'testUrl',
                items: [
                    {id: 1, name: 'Product 1', imageUrl: '', price: 1},
                    {id: 2, name: 'Product 2', imageUrl: '', price: 2}
                ]
            },
            {
                title: 'womens',
                imageUrl: 'testUrl',
                items: [
                    {id: 3, name: 'Product 3', imageUrl: '', price: 1},
                    {id: 4, name: 'Product 4', imageUrl: '', price: 2}
                ]
            },
        ];

        const expectedState: CategoriesState = {
            ...CATEGORIES_INITIAL_STATE,
            isLoading: false,
            categories: mockData
        }

        const nextState = categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesSuccess(mockData));
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