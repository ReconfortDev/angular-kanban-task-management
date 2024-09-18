import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Column } from '../../../models';
import { ColumnState } from '../../../state/columns/colum.state';
import { ColumnComponent } from './column/column.component';
import { loadColumns } from '../../../state/columns/column.action';
import { CommonModule } from '@angular/common';
import { DialogueComponent } from '../../dialogue/dialogue.component';

@Component({
  selector: 'app-body-wrapper',
  standalone: true,
  imports: [CommonModule, ColumnComponent, DialogueComponent],
  templateUrl: './body-wrapper.component.html',
  styleUrl: './body-wrapper.component.css',
})
export class BodyWrapperComponent implements OnInit {
  columns$!: Observable<Column[]>;

  constructor(private store: Store<{ column: ColumnState }>) {
    this.columns$ = this.store.select((state) => state.column.columns);
  }

  ngOnInit() {
    this.store.dispatch(loadColumns({ boardIndex: 0 }));
  }
}
