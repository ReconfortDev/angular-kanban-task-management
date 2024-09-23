import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { moveTask } from './task.actions';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions) {}

  // Log or handle any side effects
  moveTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(moveTask),
        tap(({ task, previousColumnName, newColumnName }) => {
          console.log('Task moved:', task.title, 'from', previousColumnName, 'to', newColumnName);
        })
      ),
    { dispatch: false }
  );
}
