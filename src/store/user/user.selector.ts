import { UserState } from './user.reducer';
import { createSelector } from "@reduxjs/toolkit";

export const selectUserReducer = (state: any): UserState => state.user;

export const selectCurrentUser = createSelector(
    selectUserReducer,
    (user) => user.currentUser);
