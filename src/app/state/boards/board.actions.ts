import { createAction, props } from '@ngrx/store';
import { Board, Column } from '../../models';

export const loadBoards = createAction('[Board] Load Boards');

export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ boards: Board[] }>(),
);

export const loadBoardsFailure = createAction(
  '[Board] Load Boards Failure',
  props<{ error: any }>(),
);

export const addColumn = createAction(
  '[Board] Add Column',
  props<{ boardIndex: number; column: Column }>(),
);
export const addColumnSuccess = createAction(
  '[Board] Add Column Success',
  props<{ boards: Board[] }>(),
);
export const addColumnFailure = createAction('[Board] Add Column Failure', props<{ error: any }>());

export const addBoard = createAction('[Board] Add Board', props<{ board: Board }>());
export const addBoardSuccess = createAction(
  '[Board] Add Board Success',
  props<{ boards: Board[] }>(),
);
export const addBoardFailure = createAction('[Board] Add Board Failure', props<{ error: any }>());