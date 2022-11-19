import { Middleware } from "redux";
import { RootState } from "../store";

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (!action.type) return next(action)

  console.log("Type: ", action.type);
  console.log("Payload: ", action.payload);
  console.log("Current (i.e. previous) state: ", store.getState());

  next(action); // here, middleware passes action from store to mini-reducers

  console.log("Next/Final State: ", store.getState());
};
