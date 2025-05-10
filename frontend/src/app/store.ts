import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authorizationApi, typeTesterApi } from "./services/services";

export const store = configureStore({
  reducer: {
    [typeTesterApi.reducerPath]: typeTesterApi.reducer,
    [authorizationApi.reducerPath]: authorizationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(typeTesterApi.middleware)
      .concat(authorizationApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
