import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  loadBoards,
  loadBoardsSuccess,
  loadBoardsFailure,
  addColumn,
  addColumnSuccess,
  addColumnFailure,
  addBoard,
  addBoardSuccess,
  addBoardFailure,
} from './board.actions';
import { BoardService } from '../../services/board/board.service';

@Injectable()
export class BoardEffects {
  private actions$ = inject(Actions);
  private boardService = inject(BoardService);

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBoards),
      mergeMap(() =>
        this.boardService.getBoards().pipe(
          map((boards) => loadBoardsSuccess({ boards })),
          catchError((error) => of(loadBoardsFailure({ error }))),
        ),
      ),
    ),
  );

  addColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addColumn),
      mergeMap(({ boardIndex, column }) =>
        this.boardService.addColumnToBoard(boardIndex, column).pipe(
          map((boards) => addColumnSuccess({ boards })),
          catchError((error) => of(addColumnFailure({ error }))),
        ),
      ),
    ),
  );

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBoard),
      mergeMap(({ board }) =>
        this.boardService.addBoard(board).pipe(
          map((boards) => addBoardSuccess({ boards })),
          catchError((error) => of(addBoardFailure({ error }))),
        ),
      ),
    ),
  );
}
