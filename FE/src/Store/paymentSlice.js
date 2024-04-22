import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const delay = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
}

export const createPayment = createAsyncThunk('api/payment', async ({ data }, { rejectWithValue }) => {
    try {

        const res = await axios.post(`http://localhost:9999/api/payment/create_payment_url`, {
            data
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log(res.data);
        await delay();
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


const initialState = {
    hrefPayment: null,
    statusPayment: 'idle'
}

const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createPayment.pending, (state, action) => {
                state.statusPayment = 'pending';
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.statusPayment = 'succeeded'
                state.hrefPayment = action.payload;

            })
            .addCase(createPayment.rejected, (state, action) => {
                state.statusPayment = 'failed'
            })
    }
})

export default paymentSlice.reducer;