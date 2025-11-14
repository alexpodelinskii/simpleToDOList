import type { ThemeMode } from './app-slice.ts';
import type { RootState } from './store';

export const _selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode;
