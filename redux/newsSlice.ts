import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Story = {
  id: number;
  title: string;
  by: string;
  score: number;
  url?: string;
};

type NewsState = {
  stories: Story[];
  loading: boolean;
  page: number;
  category: string;
};

const initialState: NewsState = {
  stories: [],
  loading: false,
  page: 0,
  category: "top",
};

export const fetchTopStories = createAsyncThunk(
  "news/fetchTopStories",
  async (_, { getState }) => {
    const state = getState() as { news: NewsState };
    const currentPage = state.news.page;
    const currentCategory = state.news.category;

    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/${currentCategory}stories.json`
    );
    const storyIds = await response.json();
    const stories = await Promise.all(
      storyIds
        .slice(currentPage * 10, (currentPage + 1) * 10)
        .map((id: number) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (res) => res.json()
          )
        )
    );
    return stories as Story[];
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.stories = [];
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopStories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTopStories.fulfilled, (state, action) => {
      state.loading = false;
      state.stories = [...state.stories, ...action.payload];
      state.page += 1;
    });
  },
});

export const { setCategory } = newsSlice.actions;
export default newsSlice.reducer;
