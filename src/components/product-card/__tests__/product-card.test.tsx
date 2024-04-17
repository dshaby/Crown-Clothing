import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/testing/test.utils";
import ProductCard from "../product-card.component";
import { CategoryItem } from "../../../store/categories/categories.types";

describe('Product Card tests', () => {
    test('It should add product item when product card button is clicked', () => {
        const mockProduct: CategoryItem = {
            id: 1,
            imageUrl: 'testurl',
            name: 'Item A',
            price: 10,
        }

        const {store} = renderWithProviders(<ProductCard product={mockProduct} />, {
            preloadedState: {
                cart: {
                    isCartOpen: true,
                    cartItems: []
                }
            }
        });

        expect(store.getState().cart.cartItems.length).toBe(0);

        const addToCartButton = screen.getByText(/add to cart/i);
        fireEvent.click(addToCartButton);

        expect(store.getState().cart.cartItems.length).toBe(1);
    })
})