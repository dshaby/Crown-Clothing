import { UserState } from './user.reducer';
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '../store';

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
    selectUserReducer,
    (user) => user.currentUser);
