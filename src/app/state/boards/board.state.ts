import { Board } from '../../models';

export interface BoardState {
  boards: Board[];
  error: any;
}

export const initialState: BoardState = {
  boards: [],
  error: null,
};
