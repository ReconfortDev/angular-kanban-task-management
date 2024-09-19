import { createReducer, on, Action } from '@ngrx/store';
import {addTask, updateTask, deleteTask } from './task.actions';
import {TaskState, initialState} from './task.state';
import { Board } from '../../models';

const _taskReducer = createReducer(
  initialState,
  on(addTask, (state, { boardIndex, columnIndex, task }) => {
    const updatedBoards :Board[] = [...state.boards];
    updatedBoards[boardIndex].columns[columnIndex].tasks = [
      ...updatedBoards[boardIndex].columns[columnIndex].tasks,
      task,
    ];
    return {
      ...state,
      boards: updatedBoards,
      loading: false,
    };
  }),

  on(updateTask, (state, { boardIndex, columnIndex, taskIndex, task }) => {
    const updatedBoards: Board[] = [...state.boards];
    updatedBoards[boardIndex].columns[columnIndex].tasks[taskIndex] = task;
    return {
      ...state,
      boards: updatedBoards,
      loading: false,
    };
  }),
  on(deleteTask, (state, { boardIndex, columnIndex, taskIndex }) => {
    const updatedBoards: Board[] = [...state.boards];
    updatedBoards[boardIndex].columns[columnIndex].tasks.splice(taskIndex, 1);
    return {
      ...state,
      boards: updatedBoards,
      loading: false,
    };
  })
);

export function taskReducer(state: TaskState | undefined, action: Action): TaskState {
  return _taskReducer(state, action);
}
