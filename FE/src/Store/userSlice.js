import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


export const verifyEmail = createAsyncThunk('api/user/verifyEmail', async (email, { rejectWithValue, dispatch }) => {

  try {
    const res = await axios.patch("http://localhost:9999/api/user/forgot-password", {
      email
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Dispatch action with meta to set cookie
    dispatch({
      type: 'api/user/verifyEmail',
      meta: {
        cookie: {
          key: 'code-verify',
          value: window.btoa(res.data.code),
          options: {
            // expires: (1 / 1440) * 1, //1 minutes
            expires: 1, //1 day
          },
        },
      },
    });



    console.log('code: ', res.data);
    return res.data.code;

  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const newPassWord = createAsyncThunk('api/user/newPassWord', async ({ email, password }, { rejectWithValue }) => {

  try {
    const res = await axios.put("http://localhost:9999/api/user/update-password", {
      email, password
    },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      });

    console.log(res.data);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const loginUser = createAsyncThunk('api/user/loginUser', async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.post("http://localhost:9999/api/user/login", {
      email, password
    },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })

    // Dispatch action with meta to set cookie
    dispatch({
      type: 'SET_COOKIE_ACTION',
      meta: {
        cookie: {
          key: 'user-profile',
          value: JSON.stringify(res.data.user),
          options: {
            expires: 1 / 24, //1 day
          },
        },
      },
    });

    dispatch({
      type: 'api/user/loginUser/Auth',
      meta: {
        cookie: {
          key: 'accessToken',
          value: JSON.stringify(res.data.accessToken),
          options: {
            expires: 1 / 24,
          },
        },
      },
    })

    // console.log(res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})


const initialState = {
  currentUser: null,
  status: 'idle',
  statusnewPassWord: 'idle',
  statusLogin: 'idle',
  statusUpdate: 'idle'
}
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getCurrentUser(state) {
      const userData = Cookies.get('user-profile');
      // console.log('lien 118:', userData);
      if (userData) {
        try {
          state.currentUser = JSON.parse(userData);
        } catch (error) {
          console.error("Error parsing user profile cookie:", error);
          state.currentUser = null;
        }
      } else {
        state.currentUser = null;
      }
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.statusLogin = 'pending';
      Cookies.remove('user-profile');
      Cookies.remove('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.statusLogin = 'pending';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.statusLogin = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.statusLogin = 'failed';
      })
      .addCase(verifyEmail.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        Cookies.set('email', action.meta.arg, { expires: 1 });
        state.status = 'succeeded';
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(newPassWord.pending, (state, action) => {
        state.statusnewPassWord = 'pending';
      })
      .addCase(newPassWord.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.statusnewPassWord = 'succeeded';
      })
      .addCase(newPassWord.rejected, (state, action) => {
        state.statusnewPassWord = 'failed';
      })
  }
})
export const {  getCurrentUser, clearUser } = userSlice.actions;
export default userSlice.reducer;