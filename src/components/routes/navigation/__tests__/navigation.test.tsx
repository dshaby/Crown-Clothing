import { fireEvent, screen } from "@testing-library/react";
import * as userAction from "../../../../store/user/user.action";
import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../../utils/testing/test.utils";

describe('Navigation tests', () => {
    test('It should render a sign in link and not log out if no currentUser', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: null,
                    isLoading: false,
                    error: null
                }
            }
        });

        const signInLinkEl = screen.getByText(/sign in/i);
        expect(signInLinkEl).toBeInTheDocument();

        const signOutLinkEl = screen.queryByText(/log out/i);
        expect(signOutLinkEl).not.toBeInTheDocument();

    });

    test('Should render Log Out and not sign in if there is currentUser', () => {
        renderWithProviders(<Navigation />, {
            preloadedState: {
                user: {
                    currentUser: {email: 'sample@sample.com'},
                    isLoading: false,
                    error: null
                }
            }
        });

        const signOutLinkEl = screen.getByText(/log out/i);
        expect(signOutLinkEl).toBeInTheDocument();

        const signInLinkEl = screen.queryByText(/sign in/i);
        expect(signInLinkEl).not.toBeInTheDocument();
    });

    describe('isCartOpen', () => {
        test('Should render cart dropdown when isCartOpen = true', () => {
            renderWithProviders(<Navigation />, {
                preloadedState: {
                    cart: {
                        isCartOpen: true,
                        cartItems: []
                    }
                }
            });

            const cart = screen.getByText(/checkout/i);
            expect(cart).toBeInTheDocument();
        });

        test('Should not render cart dropdown when isCartOpen = false', () => {
            renderWithProviders(<Navigation />, {
                preloadedState: {
                    cart: {
                        isCartOpen: false,
                        cartItems: []
                    }
                }
            });

            const cart = screen.queryByText(/checkout/i);
            expect(cart).not.toBeInTheDocument();
        })
    });

    describe('signIn/Out Actions', () => {
        test('It should dispatch signOutStart action when clicking on the sign out link', () => {
            const mockDispatch = jest.fn();

            jest.mock("react-redux", () => ({
                ...jest.requireActual("react-redux"),
                useDispatch: () => mockDispatch,
            }));
                        
            renderWithProviders(<Navigation />, {
                preloadedState: {
                    user: {
                        currentUser: {email: 'hey@me.com'},
                        isLoading: false,
                        error: null
                    }
                }
            });

            const signOutLink = screen.getByText(/log out/i);
            expect(signOutLink).toBeInTheDocument();
            const signOutStartAction = jest.spyOn(userAction, 'signOutStart');

            fireEvent.click(signOutLink);
            expect(signOutStartAction).toHaveBeenCalled();
        })
    })
})