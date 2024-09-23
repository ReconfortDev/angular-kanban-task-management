import { Board } from '../../models';

export interface TaskState {
  boards: Board[];
  error: string | null;
  loading: boolean;
}

export const initialState: TaskState = {
  boards : [],
  error: null,
  loading: false,
};
