import {RenderOptions, render} from "@testing-library/react";
import { Provider } from "react-redux";
import { EnhancedStore, configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../../store/root-reducer";
import { PropsWithChildren } from "react";
import { RootState } from "../../store/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'>{
    preloadedState?: Partial<RootState>
    store?: EnhancedStore<RootState>
}

export const renderWithProviders = (ui: React.ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) => {

    const {preloadedState = {}, store = configureStore({reducer: rootReducer, preloadedState}), ...renderOptions} = extendedRenderOptions;

    const Wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>{children}</Provider>
    )
    
    return {
        store,
        ...render(ui, {wrapper: Wrapper, ...renderOptions})
    }
}