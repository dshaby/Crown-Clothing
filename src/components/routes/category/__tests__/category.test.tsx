import {screen} from "@testing-library/react";
import Category from "../category.component";
import { renderWithProviders } from "../../../../utils/testing/test.utils";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        category: 'mens',
    })
}))

describe('Category tests', () => {
    test('It should render a spinner if isLoading is true', () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: true,
                    error: null,
                    categories: []
                }
            }
        });

        const spinner = screen.getByTestId('spinner');
        expect(spinner).toBeInTheDocument();
    })

    test('It should render products if isLoading is false and there are items', () => {
        renderWithProviders(<Category />, {
            preloadedState: {
                categories: {
                    isLoading: false,
                    error: null,
                    categories: [
                        {
                            title: 'mens',
                            items: [
                                {id: 1, name: 'Product 1', imageUrl: 'url', price: 1},
                                {id: 2, name: 'Product 2', imageUrl: 'url', price: 2},
                            ],
                            imageUrl: 'category-url'
                        }
                    ]
                }
            }
        });

        const spinner = screen.queryByTestId('spinner');
        expect(spinner).not.toBeInTheDocument();

        const product = screen.getByText(/product 1/i);
        expect(product).toBeInTheDocument();
    });
});