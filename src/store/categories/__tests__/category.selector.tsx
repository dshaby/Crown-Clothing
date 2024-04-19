import { selectCategories, selectCategoriesIsLoading, selectCategoriesMap } from "../categories.selector"
import { CategoryMap } from "../categories.types";
import {  mockRootState } from "../mocks"

describe('Category Selector', () => {
    test('selectCategories should return the categoriesData', () => {
        const categoriesSlice = selectCategories(mockRootState);

        expect(categoriesSlice).toEqual(mockRootState.categories.categories);
    });

    test('selectCategoriesIsLoading should return isLoading state', () => {
        const isLoading = selectCategoriesIsLoading(mockRootState);

        expect(isLoading).toEqual(false);
    });

    test('selectCategoriesMap should convert items array into appropriate map', () => {
        const expectedCategoriesMap: CategoryMap = {
            mens: [
                {id: 1, name: 'Product 1', imageUrl: '', price: 1},
                {id: 2, name: 'Product 2', imageUrl: '', price: 2}
            ],
            womens: [
                {id: 3, name: 'Product 3', imageUrl: '', price: 1},
                {id: 4, name: 'Product 4', imageUrl: '', price: 2}
            ]
        }

        const categoriesMap = selectCategoriesMap(mockRootState);
        expect(categoriesMap).toEqual(expectedCategoriesMap);
    })
})