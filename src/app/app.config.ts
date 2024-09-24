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
import { taskReducer } from './state/task/task.reducer';
import { UIReducer } from './state/ui/ui.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ theme: themeReducer, board: boardReducer, column: columnReducer, task: taskReducer, ui: UIReducer }),
    provideEffects([BoardEffects, ColumnEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
};
