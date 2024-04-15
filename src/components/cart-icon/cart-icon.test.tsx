import CartIcon from "./cart-icon.component";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/testing/test.utils";

describe('Cart Icon Component tests', () => {
    test('Uses preloaded state to render', () => {
        const initialCartItems = [
            {id: 1, name: 'Item A', imageUrl: 'test', price: 10, quantity: 1},
            {id: 2, name: 'Item B', imageUrl: 'test', price: 10, quantity: 2}
        ];

        const initialCartOpen = true;

        renderWithProviders(<CartIcon />, {
            preloadedState: {
                cart: {
                    cartItems: initialCartItems,
                    isCartOpen: initialCartOpen,
                }
            }
        });

        const cartIconElement = screen.getByText('3');
        expect(cartIconElement).toBeInTheDocument();
    })
})