import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


const delay = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
}



export const getPostDetail = createAsyncThunk('api/post/get-post-by-id', async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`http://localhost:9999/api/post/get-post-by-id/${id}`, {
            id
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('line 14: ', res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


export const getAllPost = createAsyncThunk('api/post/get-all-posts', async (rejectWithValue) => {

    try {

        await delay();

        const res = await axios.get(`http://localhost:9999/api/post/get-all-posts`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log(res);
        // console.log('line 30:', res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getAllPostByIdCompany = createAsyncThunk('api/post/get-posts-by-company', async (id , rejectWithValue) => {

    try {

        await delay();

        const res = await axios.get(`http://localhost:9999/api/post/get-posts-by-company-id/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const searchByKeyWord = createAsyncThunk('api/post/search-posts-by-keyword', async (text, { rejectWithValue }) => {
    try {
        const res = await axios.get(`http://localhost:9999/api/post/search-posts-by-keyword/${text}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        console.log('line 46:', res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const followPost = createAsyncThunk('api/user/followPost', async ({ id, savedPost }, { rejectWithValue }) => {
    const token = Cookies.get('accessToken');
    const userProfile = JSON.parse(Cookies.get("user-profile"));
    console.log(userProfile);
    try {
        const res = axios.put(`http://localhost:9999/api/user/${id}/follow-post`, {
            savedPost
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(token)
            }
        })
        Cookies.set('user-profile', JSON.stringify({
            ...userProfile,
            savedPost: [...userProfile.savedPost, savedPost._id]
        }))

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const unfollowPost = createAsyncThunk('api/user/unfollowPost', async ({ id, savedPost }, { rejectWithValue }) => {
    const token = Cookies.get('accessToken');
    const userProfile = JSON.parse(Cookies.get("user-profile"));
    try {
        const res = axios.put(`http://localhost:9999/api/user/${id}/unfollow-post`, {
            savedPost
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + JSON.parse(token)
            }
        })
        Cookies.set('user-profile', JSON.stringify({
            ...userProfile,
            savedPost: userProfile.savedPost.filter(item => item !== savedPost._id)
        }))
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getAllPostFollowed = createAsyncThunk('api/company/get-all-posts-followed', async (id, { rejectWithValue }) => {
    const token = Cookies.get('accessToken');
    try {

        await delay();

        const res = await axios.get(`http://localhost:9999/api/user/${id}/get-all-posts-followed`,  {
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
    postArr: [],
    postDetail: {},
    postArrForCompany: [],
    postArrFollow: [],
    statusSearch: 'idle',
    statusGetOne: 'idle',
    statusHandleForFP: 'idle',
    statusHandleFoUFP: 'idle',
    statusGetAllForCompany: 'idle',
    statusPAF: 'idle'
}

const jobPostSlice = createSlice({
    name: 'jobPost',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPost.pending, (state, action) => {
                state.statusSearch = 'pending';
            })
            .addCase(getAllPost.fulfilled, (state, action) => {
                state.postArr = action.payload.data;
                state.statusSearch = 'succeeded';
            })
            .addCase(getAllPost.rejected, (state, action) => {
                state.statusSearch = 'failed';
            })
            .addCase(getPostDetail.pending, (state, action) => {
                state.statusGetOne = 'pending';
            })
            .addCase(getPostDetail.fulfilled, (state, action) => {
                state.postDetail = action.payload.data;
                state.statusGetOne = 'succeeded';
            })
            .addCase(getPostDetail.rejected, (state, action) => {
                state.statusGetOne = 'failed';
            })
            .addCase(searchByKeyWord.pending, (state, action) => {
                state.statusSearch = 'pending';
            })
            .addCase(searchByKeyWord.fulfilled, (state, action) => {
                state.postArr = action.payload.data;
                state.statusSearch = 'succeeded';
            })
            .addCase(searchByKeyWord.rejected, (state, action) => {
                state.postArr = [];
                state.statusSearch = 'failed';
            })
            .addCase(followPost.pending, (state, action) => {
                state.statusHandleForFP = 'pending';
            })
            .addCase(followPost.fulfilled, (state, action) => {
                state.statusHandleForFP = 'succeded';
            })
            .addCase(followPost.rejected, (state, action) => {
                state.statusHandleForFP = 'failed'
            })
            .addCase(unfollowPost.pending, (state, action) => {
                state.statusHandleFoUFP = 'pending';
            })
            .addCase(unfollowPost.fulfilled, (state, action) => {
                state.statusHandleFoUFP = 'succeded';
            })
            .addCase(unfollowPost.rejected, (state, action) => {
                state.statusHandleFoUFP = 'failed'
            })
            .addCase(getAllPostByIdCompany.pending, (state, action) => {
                state.statusGetAllForCompany = 'pending';
            })
            .addCase(getAllPostByIdCompany.fulfilled, (state, action) => {
                state.statusGetAllForCompany = 'succeded';
                state.postArrForCompany = action.payload.data;
            })
            .addCase(getAllPostByIdCompany.rejected, (state, action) => {
                state.statusGetAllForCompany = 'failed';
            })
            .addCase(getAllPostFollowed.pending, (state, action) => {
                state.statusPAF = 'pending';
            })
            .addCase(getAllPostFollowed.fulfilled, (state, action) => {
                state.postArrFollow = action.payload.data;
                state.statusPAF = 'succeeded';
            })
            .addCase(getAllPostFollowed.rejected, (state, action) => {
                state.statusPAF = 'failed';
            })
            
    }
})


export default jobPostSlice.reducer;