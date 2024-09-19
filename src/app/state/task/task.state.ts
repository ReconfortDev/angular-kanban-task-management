import { Board } from '../../models';

export interface TaskState {
  boards: Board[];
  error: any;
  loading: boolean;
};

export const initialState: TaskState = {
  boards: [],
  error: null,
  loading: false,
};
