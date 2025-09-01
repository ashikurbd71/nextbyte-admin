import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { apiSlice } from "./features/api/apiSlice";
import adminAuthReducer from "./features/adminauth/adminAuthSlice";


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    adminAuth: adminAuthReducer,
  },
  devTools: import.meta.env.VITE_ENV !== "PRODUCTION",
  middleware: (gDM) => gDM().concat([apiSlice.middleware]),
});

setupListeners(store.dispatch);
