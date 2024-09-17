import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Board } from '../../models';
import { jsonData } from '../../data/data';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor() {}

  getBoards(): Observable<Board[]> {
    return of(jsonData.boards);
  }
}
