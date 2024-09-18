import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { loadColumns, loadColumnsSuccess, loadColumnsFailure } from './column.action';
import { BoardService } from '../../services/board/board.service';

@Injectable()
export class ColumnEffects {
  private actions$ = inject(Actions);
  private boardService = inject(BoardService);

  loadColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadColumns),
      mergeMap(({ boardIndex }) =>
        this.boardService.getColumnsByBoardIndex(boardIndex).pipe(
          map((columns) => loadColumnsSuccess({ columns: columns || [] })),
          catchError((error) => of(loadColumnsFailure({ error }))),
        ),
      ),
    ),
  );
}
