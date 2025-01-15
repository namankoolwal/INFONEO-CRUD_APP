import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const fetchPosts = createAsyncThunk('fetchPosts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const addPost = createAsyncThunk('addPost', async (post) => {
  const response = await axios.post(API_URL, post);
  return response.data;
});

const updatePost = createAsyncThunk('updatePost', async (post) => {
  const response = await axios.put(`${API_URL}/${post.id}`, post);
  return response.data;
});

const deletePost = createAsyncThunk('deletePost', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      });
  },
});

export { fetchPosts, addPost, updatePost, deletePost };

export default postsSlice.reducer;