import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Column } from '../../../models';
import { ColumnState } from '../../../state/columns/colum.state';
import { ColumnComponent } from './column/column.component';
import { loadColumns } from '../../../state/columns/column.action';
import { CommonModule } from '@angular/common';
import { DialogueComponent } from '../../dialogue/dialogue.component';
import { loadBoards } from '../../../state/boards/board.actions';
import { TaskState } from '../../../state/task/task.state';

@Component({
  selector: 'app-body-wrapper',
  standalone: true,
  imports: [CommonModule, ColumnComponent, DialogueComponent],
  templateUrl: './body-wrapper.component.html',
  styleUrl: './body-wrapper.component.css',
})
export class BodyWrapperComponent implements OnInit {
  columns$!: Observable<Column[]>;

  constructor(private store: Store<{ column: ColumnState, task: TaskState }>) {
  }

  ngOnInit() {
    this.columns$ = this.store.select((state) => state.task.boards[0].columns);

    this.store.dispatch(loadBoards());
  }
}




