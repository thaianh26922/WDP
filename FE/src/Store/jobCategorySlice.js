import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const delay = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
}

//phần này bên BE chưa cóhttp://localhost:9999/api/job-category/get-all-categories
export const getAllCategory = createAsyncThunk('api/job-category', async (rejectWithValue) => {
    try {
        await delay();
        const res = await axios.get(`http://localhost:9999/api/job-category/get-all-categories`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // console.log('line 13: ', res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const initialState = {
    categoryArr: [],
    status: 'idle'
}

const jobCategorySlice = createSlice({
    name:'jobCategory',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllCategory.pending, (state, action) => {
            state.status = 'pending';
        })
        .addCase(getAllCategory.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.categoryArr = action.payload.data;
        })
        .addCase(getAllCategory.rejected, (state, action) => {
            state.status = 'failed';
        })
    }
})

export default jobCategorySlice.reducer;