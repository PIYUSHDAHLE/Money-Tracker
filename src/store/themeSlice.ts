import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "light" as Theme },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      // Update <html> class for Tailwind dark mode
      if (state.mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.mode = action.payload;
      if (state.mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
