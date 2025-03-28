import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch weather data asynchronously
export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (city, { rejectWithValue }) => {
  try {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Secure API key usage
    
console.log("API Key:", API_KEY); // Debugging

    


    if (!API_KEY) throw new Error("API Key is missing! Set it in .env file.");

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to fetch weather data");
    }

    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Task Slice (with localStorage sync)
const taskSlice = createSlice({
  name: "tasks",
  initialState: JSON.parse(localStorage.getItem("tasks")) || [],
  reducers: {
    addTask: (state, action) => {
      const updatedState = [...state, action.payload];
      localStorage.setItem("tasks", JSON.stringify(updatedState));
      return updatedState;
    },
    removeTask: (state, action) => {
      const updatedTasks = state.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    },
    updateTask: (state, action) => {
      const updatedTasks = state.map((task) =>
        task.id === action.payload.id ? { ...task, completed: action.payload.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    },
  },
});

// Authentication Slice
const authSlice = createSlice({
  name: "auth",
  initialState: JSON.parse(localStorage.getItem("auth")) || { isAuthenticated: false },
  reducers: {
    login: (state) => {
      const newState = { isAuthenticated: true };
      localStorage.setItem("auth", JSON.stringify(newState));
      return newState;
    },
    logout: (state) => {
      const newState = { isAuthenticated: false };
      localStorage.setItem("auth", JSON.stringify(newState));
      return newState;
    },
  },
});

// Weather Slice
const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: null, error: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.error = action.payload; // Now stores detailed error messages
        state.loading = false;
      });
  },
});

export const { addTask, removeTask, updateTask } = taskSlice.actions;
export const { login, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    auth: authSlice.reducer,
    weather: weatherSlice.reducer,
  },
});
