import {expectSaga, testSaga} from 'redux-saga-test-plan';
import { categoriesSaga, fetchCategoriesAsync, onFetchCategories } from "../categories.saga"
import { call } from 'redux-saga/effects';
import { CATEGORIES_ACTION_TYPES, CategoryItem } from '../categories.types';
import { fetchCategoriesFailed, fetchCategoriesSuccess } from '../categories.action';
import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';
import { mockCategoriesData } from '../mocks';
import { throwError } from 'redux-saga-test-plan/providers';

describe('category sagas', () => {
    test('categoriesSaga', () => {
        testSaga(categoriesSaga)
        .next()
        .all([call(onFetchCategories)])
        .next()
        .isDone();
    });

    test('onFetchCategories', () => {
        testSaga(onFetchCategories)
        .next()
        .takeLatest(
            CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
            fetchCategoriesAsync
        )
        .next()
        .isDone();
    });

    test('fetchCategoriesAsync success', () => {

        const mockCategoriesArray: CategoryItem[] = [
            {id: 1, name: 'Product 1', imageUrl: '', price: 1},
            {id: 2, name: 'Product 2', imageUrl: '', price: 2}
        ]

        expectSaga(fetchCategoriesAsync)
            .provide([[call(getCategoriesAndDocuments), mockCategoriesArray]])
            .put(fetchCategoriesSuccess(mockCategoriesData))
            .run();
    });

    test('fetchCategoriesAsync failure', () => {
        const mockErr = new Error('An error occurred');

        expectSaga(fetchCategoriesAsync)
            .provide([
                [call(getCategoriesAndDocuments), throwError(mockErr)]
            ])
            .put(fetchCategoriesFailed(mockErr))
            .run();
    })
});