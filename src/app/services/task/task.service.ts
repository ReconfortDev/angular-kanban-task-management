import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Board, Task} from '../../models';
import {BoardService} from '../board/board.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private boardService: BoardService) {}

  addTaskToColumn(boardIndex: number, columnIndex: number, task: Task): Observable<Board[]> {
    console.log('New Board Index:', boardIndex);
    console.log('New Column Index:', columnIndex);
    console.log('Task:', task);

    // Create a copy of the boards array
    const boards = [...this.boardService.updatedBoards];
    console.log('Initial Boards:', boards);

    // Check if the boardIndex is valid
    if (boardIndex >= 0 && boardIndex < boards.length) {
      const board = boards[boardIndex];
      console.log('Selected Board:', board);

      // Check if the columnIndex is valid
      if (columnIndex >= 0 && columnIndex < board.columns.length) {
        console.log('Initial Column:', board.columns[columnIndex]);

        // Add the task to the column
        board.columns[columnIndex].tasks = [...board.columns[columnIndex].tasks, task];

        // Log the updated column
        console.log('Updated Column:', board.columns[columnIndex]);
        console.log('Updated Boards:', boards);

        // Return the updated boards
        return of(boards);
      } else {
        console.error('Invalid Column Index:', columnIndex);
      }
    } else {
      console.error('Invalid Board Index:', boardIndex);
    }

    // Return an empty array if indices are invalid
    return of([]);
  }

  updateTaskInColumn(boardIndex: number, columnIndex: number, taskIndex: number, updatedTask: Task): Observable<Board[]> {
    const boards = [...this.boardService.updatedBoards];
    if (boardIndex >= 0 && boardIndex < boards.length) {
      const board = boards[boardIndex];
      if (columnIndex >= 0 && columnIndex < board.columns.length) {
        board.columns[columnIndex].tasks[taskIndex] = updatedTask;
      }
      return of(boards);
    }
    return of([]);
  }


  deleteTaskFromColumn(boardIndex: number, columnIndex: number, taskIndex: number): Observable<Board[]> {
    const boards = [...this.boardService.updatedBoards];
    if (boardIndex >= 0 && boardIndex < boards.length) {
      const board = boards[boardIndex];
      if (columnIndex >= 0 && columnIndex < board.columns.length) {
        board.columns[columnIndex].tasks.splice(taskIndex, 1);
      }
      return of(boards);
    }
    return of([]);
  }

}
