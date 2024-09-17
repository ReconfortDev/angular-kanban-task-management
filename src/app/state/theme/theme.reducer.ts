import { createReducer, on } from '@ngrx/store';
import { setTheme, toggleTheme } from './theme.actions';

export interface ThemeState {
  theme: 'light' | 'dark';
}

export const initialState: ThemeState = {
  theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
};

export const themeReducer = createReducer(
  initialState,
  on(toggleTheme, (state): ThemeState => {
    const newTheme: 'light' | 'dark' = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return { theme: newTheme };
  }),
  on(setTheme, (state, { theme }): ThemeState => {
    localStorage.setItem('theme', theme);
    return { theme };
  }),
);
