import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import provinceSlice from "./provinceSlice.js";
import jobPostSlice from "./jobPostSlice.js";
import jobCategorySlice from "./jobCategorySlice.js";
import cookieMiddleware from "./middleware/cookieMiddleware.js";
import paymentSlice from "./paymentSlice.js";
import companySlice from "./companySlice.js";
// import localStogeMiddleware from "./middleware/localStogeMiddleware.js";
const store = configureStore({
    reducer: {
        users: userSlice,
        provinces: provinceSlice,
        jobPost: jobPostSlice,
        jobCategory: jobCategorySlice,
        payments: paymentSlice,
        companies: companySlice
    },
    middleware: (getDefaultMiddleware) => //returns the default middleware provided by Redux Toolkit.
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(cookieMiddleware),  //concat This concatenates additional middleware with the default middleware
})

export default store;