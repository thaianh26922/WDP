import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProvince = createAsyncThunk('api/province/getProvince', async (rejectWithValue) => {
    try {
        const res = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        // console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const initialState = {
    provinceArr: [],
    status: 'idle',
}


const provinceSlice = createSlice({
    name: 'provinces',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProvince.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(getProvince.fulfilled, (state, action) => {
                state.provinceArr = action.payload;
                state.status = 'succeeded';
            })
            .addCase(getProvince.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})
export default provinceSlice.reducer;