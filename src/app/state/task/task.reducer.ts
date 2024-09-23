import { createReducer, on } from '@ngrx/store';
import { initialState } from './task.state';
import { addTask } from './task.actions';
import { loadBoardsSuccess } from '../boards/board.actions';

export const taskReducer = createReducer(
  initialState,

  on(loadBoardsSuccess, (state, { boards }) => ({
    ...state,
    boards: boards,
    error: null,
  })),

  on(addTask, (state, { boardIndex, task }) => {
    const boards = [...state.boards];
    // console.log("boards", boards);
    const currentBoard = boards[boardIndex];
    // console.log("currentBoard", currentBoard);

    if (!currentBoard) {
      console.error("Board not found at index:", boardIndex);
      return state;
    }

    const updatedColumns = currentBoard.columns.map(column => {
      if (column.name === task.status) {
        // console.log("name", column.name)
        // console.log("tatsy", task.status)
        // console.log("before", column.tasks)

        const updatedTasks = [...column.tasks, task];
        // console.log("after", updatedTasks)
        return {
          ...column,
          tasks: updatedTasks,
        };
      }
      return column;
    });

    return {
      ...state,
      boards: [
        ...boards.slice(0, boardIndex),
        { ...currentBoard, columns: updatedColumns },
        ...boards.slice(boardIndex + 1),
      ],
    };
  })
);
