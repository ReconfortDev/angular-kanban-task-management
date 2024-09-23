import { createReducer, on } from '@ngrx/store';
import { initialState } from './task.state';
import { addTask, moveTask } from './task.actions';
import { addBoard, addColumn, deleteBoard, loadBoardsSuccess } from '../boards/board.actions';

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

        const updatedTasks = [...column.tasks, task];
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
  }),

  on(moveTask, (state, { boardIndex, task, previousColumnName, newColumnName, previousIndex, newIndex }) => {
    const updatedColumns = state.boards[boardIndex].columns.map(column => {
      console.log("updatedColumns", updatedColumns)
      // If it's the previous column, remove the task
      if (column.name === previousColumnName) {
        const tasks = [...column.tasks];
        tasks.splice(previousIndex, 1);
        return { ...column, tasks };
      }

      // If it's the new column, add the task at the new index
      if (column.name === newColumnName) {
        const tasks = [...column.tasks];
        tasks.splice(newIndex, 0, task);
        return { ...column, tasks };
      }

      // Return other columns unchanged
      return column;
    });

    return {
      ...state,
      columns: updatedColumns
    };
  }),

  on(addBoard, (state, { board }) => {
    console.log(state);
    return {
      ...state,
      boards: [...state.boards, board],
    };
  }),

  on(addColumn, (state, { boardIndex, column }) => {
    console.log(state.boards)
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

  on(deleteBoard, (state, { boardIndex }) => {
    console.log("state", state)
    const updatedBoards = state.boards.filter((_, index) => index !== boardIndex);
    console.log("updatedBoards", updatedBoards)

    return {
      ...state,
      boards: updatedBoards,
    };
  }),
);
