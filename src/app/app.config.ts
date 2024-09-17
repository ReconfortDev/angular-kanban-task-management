import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';

import { themeReducer } from './state/theme/theme.reducer';
import { boardReducer } from './state/boards/board.reducer';
import { BoardEffects } from './state/boards/board.effects';
import { ColumnEffects } from './state/columns/colum.effect';
import { columnReducer } from './state/columns/column.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ theme: themeReducer, board: boardReducer, column: columnReducer }),
    provideEffects([BoardEffects, ColumnEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
