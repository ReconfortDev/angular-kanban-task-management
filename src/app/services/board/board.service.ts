import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Board, Column } from '../../models';
import { jsonData } from '../../data/data';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  updatedBoards: Board[] = [...jsonData.boards];
  constructor() {}

  getBoards(): Observable<Board[]> {
    console.log('jsonData', this.updatedBoards);
    return of(this.updatedBoards);
  }

  getColumnsByBoardIndex(boardIndex: number): Observable<Board['columns'] | null> {
    const board = this.updatedBoards[boardIndex];
    return board ? of(board.columns) : of(null);
  }

  addColumnToBoard(boardIndex: number, column: Column): Observable<Board[]> {
    if (boardIndex >= 0 && boardIndex < this.updatedBoards.length) {
      this.updatedBoards[boardIndex] = {
        ...this.updatedBoards[boardIndex],
        columns: [...this.updatedBoards[boardIndex].columns, column],
      };
      return of(this.updatedBoards);
    }
    return of([]);
  }

  addBoard(board: Board): Observable<Board[]> {
    this.updatedBoards = [...this.updatedBoards, board];
    return of(this.updatedBoards);
  }
}
