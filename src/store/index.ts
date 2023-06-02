import { configureStore } from "@reduxjs/toolkit";
import {setupListeners} from '@reduxjs/toolkit/query'
import { englishApi } from "./english/english.api";

export const store = configureStore({
  reducer: {
    [englishApi.reducerPath]: englishApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(englishApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>