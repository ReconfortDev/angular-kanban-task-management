import { Action, createReducer, on } from '@ngrx/store';
import { loadBoardsSuccess, loadBoardsFailure, addColumn, addBoard } from './board.actions';
import { BoardState, initialState } from './board.state';

const _boardReducer = createReducer(
  initialState,
  on(loadBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards: boards,
    error: null,
  })),
  on(loadBoardsFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(addBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board],
  })),
  on(addColumn, (state, { boardIndex, column }) => {
    const boards = state.boards.map((board, index) => {
      if (index === boardIndex) {
        return {
          ...board,
          columns: [...board.columns, column]
        };
      }
      return board;
    });
    return { ...state, boards };
  }),
);

export function boardReducer(state: BoardState | undefined, action: Action): BoardState {
  return _boardReducer(state, action);
}
