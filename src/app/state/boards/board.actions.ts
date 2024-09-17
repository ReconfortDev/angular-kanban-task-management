import { createAction, props } from '@ngrx/store';
import { Board } from '../../models';

export const loadBoards = createAction('[Board] Load Boards');

export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ boards: Board[] }>(),
);

export const loadBoardsFailure = createAction(
  '[Board] Load Boards Failure',
  props<{ error: any }>(),
);
