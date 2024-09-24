import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Board, Column } from '../../models';
import { jsonData } from '../../data/data';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private  _activeBoardIndex = signal<number>(0);
  private _activeBoard$ = new BehaviorSubject<number>(this._activeBoardIndex());
  updatedBoards: Board[] = [...jsonData.boards];

  get activeBoard$(): Observable<number> {
    return this._activeBoard$.asObservable();
  }

  get activeBoardIndex(): number {
    return this._activeBoardIndex();
  }

  set activeBoardIndex(index: number) {
    if (index >= 0 && index < this.updatedBoards.length) {
      this._activeBoardIndex.set(index);
      this._activeBoard$.next(index);
    } else {
      console.warn('Index out of bounds:', index);
    }
  }

  getBoards(): Observable<Board[]> {
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
