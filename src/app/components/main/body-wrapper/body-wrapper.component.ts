import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Column } from '../../../models';
import { ColumnState } from '../../../state/columns/colum.state';
import { ColumnComponent } from './column/column.component';
import { CommonModule } from '@angular/common';
import { DialogueComponent } from '../../dialogue/dialogue.component';
import { TaskState } from '../../../state/task/task.state';
import { BoardService } from '../../../services/board/board.service';

@Component({
  selector: 'app-body-wrapper',
  standalone: true,
  imports: [CommonModule, ColumnComponent, DialogueComponent],
  templateUrl: './body-wrapper.component.html',
  styleUrls: ['./body-wrapper.component.css'],
})
export class BodyWrapperComponent implements OnInit {
  columns$!: Observable<Column[]>;
  index = 0;

  constructor(
    private store: Store<{ column: ColumnState, task: TaskState }>,
    private boardService: BoardService
  ) {}

  ngOnInit() {
    // Subscribe to active board changes from the BoardService
    this.boardService.activeBoard$.subscribe(index => {
      this.index = index;
      this.getCurrentColumn(this.index);
    });
  }

  getCurrentColumn(index: number) {
    this.columns$ = this.store.select(state => state.task.boards[index]?.columns);
    this.columns$.subscribe(columns => {
      console.log("Columns:", columns);
    });
  }
}
