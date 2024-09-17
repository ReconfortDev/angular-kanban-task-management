import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Board, Column } from '../../models';
import { jsonData } from '../../data/data';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor() {}

  getBoards(): Observable<Board[]> {
    return of(jsonData.boards);
  }

  getColumnsByBoardIndex(boardIndex: number): Observable<Board['columns'] | null> {
    const board = jsonData.boards[boardIndex];
    console.log('Columns:', board.columns);
    return of(board ? board.columns : null);
  }
}
