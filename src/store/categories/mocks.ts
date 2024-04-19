import { RootState } from "../store";
import { Category } from "./categories.types";

export const mockCategoriesData: Category[] = [
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

export const mockRootState: RootState = {
    user: {
        currentUser: null,
        isLoading: false,
        error: null
    },
    categories: {
        isLoading: false,
        error: null,
        categories: mockCategoriesData
    },
    cart: {
        isCartOpen: false,
        cartItems: []
    }
}