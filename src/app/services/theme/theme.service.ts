import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleTheme, setTheme } from '../../state/theme/theme.actions';
import { ThemeState } from '../../state/theme/theme.reducer';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private store: Store<{ theme: ThemeState }>) {}

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  setTheme(theme: 'light' | 'dark') {
    this.store.dispatch(setTheme({ theme }));
  }
}
