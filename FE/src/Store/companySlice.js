import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const delay = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
}

export const getAllCompany = createAsyncThunk('api/company/get-all-companies', async (rejectWithValue) => {

    try {

        await delay();

        const res = await axios.get(`http://localhost:9999/api/company/get-all-companies`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        // console.log('line 30:', res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getACompany = createAsyncThunk('api/company/get-company-by-id', async (id, { rejectWithValue }) => {
    console.log(id);
    try {
        const res = await axios.get(`http://localhost:9999/api/company/get-by-id-company/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('line 14: ', res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    } 
});

export const followCompany = createAsyncThunk('api/company/follow-company', async ({ id, followCompany }, { rejectWithValue }) => {
    const token = Cookies.get('accessToken');
    const userProfile = JSON.parse(Cookies.get("accessToken"));
    console.log(userProfile);
    try {
        const res = axios.put(`http://localhost:9999/api/user/${id}/follow-company`, {
            followCompany
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(token)
            }
        })
        Cookies.set('user-profile', JSON.stringify({
            ...userProfile,
            followCompany: [...userProfile.followCompany, followCompany._id]
        }))

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const unfollowCompany = createAsyncThunk('api/company/unfollow-company', async ({ id, followCompany }, { rejectWithValue }) => {
    const token = Cookies.get('accessToken');
    const userProfile = JSON.parse(Cookies.get("user-profile"));
    try {
        const res = axios.put(`http://localhost:9999/api/user/${id}/unfollow-company`, {
            followCompany
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(token)
            }
        })
        Cookies.set('user-profile', JSON.stringify({
            ...userProfile,
            followCompany: userProfile.followCompany.filter(item => item !== followCompany._id)
        }))
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getAllCompanyFollowed = createAsyncThunk('api/company/get-all-company-followed', async (id, { rejectWithValue }) => {
    const token = Cookies.get('accessToken');
    try {

        await delay();

        const res = await axios.get(`http://localhost:9999/api/user/${id}/get-all-companies-followed`,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(token)
            }
        })
        // console.log('line 30:', res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const initialState = {
    companyArr: [],
    companyDetail: {},
    companyArrFollow: [],
    status: 'idle',
    statusGetOne: 'idle',
    statusFC: 'idle',
    statusUFC: 'idle',
    statusCAF: 'idle'
}


const companySlice = createSlice({
    name: 'companies',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllCompany.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(getAllCompany.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.companyArr = action.payload.data;
            })
            .addCase(getAllCompany.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(getACompany.pending, (state, action) => {
                state.statusGetOne = 'pending';
            })
            .addCase(getACompany.fulfilled, (state, action) => {
                state.statusGetOne = 'succeeded';
                state.companyDetail = action.payload.data;
            })
            .addCase(getACompany.rejected, (state, action) => {
                state.statusGetOne = 'failed';
            })
            .addCase(followCompany.pending, (state, action) => {
                state.statusFC = 'pending';
            })
            .addCase(followCompany.fulfilled, (state, action) => {
                state.statusFC = 'succeeded';
            })
            .addCase(followCompany.rejected, (state, action) => {
                state.statusFC = 'failed';
            })
            .addCase(unfollowCompany.pending, (state, action) => {
                state.statusUFC = 'pending';
            })
            .addCase(unfollowCompany.fulfilled, (state, action) => {
                state.statusUFC = 'succeeded';
            })
            .addCase(unfollowCompany.rejected, (state, action) => {
                state.statusUFC = 'failed';
            })
            .addCase(getAllCompanyFollowed.pending, (state, action) => {
                state.statusCAF = 'pending';
            })
            .addCase(getAllCompanyFollowed.fulfilled, (state, action) => {
                state.statusCAF = 'succeeded';
                state.companyArrFollow = action.payload.data;
            })
            .addCase(getAllCompanyFollowed.rejected, (state, action) => {
                state.statusCAF = 'failed';
            })
    }
})

export default companySlice.reducer;