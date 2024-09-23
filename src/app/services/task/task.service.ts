import { Injectable } from '@angular/core';
import {BoardService} from '../board/board.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private boardService: BoardService) {}
}
