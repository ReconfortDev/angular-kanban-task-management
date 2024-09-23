import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Board, Column, Task } from '../../../../models';
import { NgForOf } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from '../../../../services/board/board.service';
import { Observable } from 'rxjs';
import { ColumnState } from '../../../../state/columns/colum.state';
import { loadColumns } from '../../../../state/columns/column.action';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [NgForOf, AsyncPipe, NgIf],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent implements OnInit {
  @Input() task!: Task | null;
  taskForm!: FormGroup;
  boards: Board[] = [];
  columns$!: Observable<Column[]>;
  boardIndex = 0;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private columnStore: Store<{ column: ColumnState }>,
    private boardService: BoardService,
  ) {
    this.columns$ = this.columnStore.select((state) => state.column.columns);
  }

  ngOnInit(): void {
    this.boardIndex = this.boardService.activeBoardIndex;

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      subtasks: this.fb.array([]),
    });

    this.store.dispatch(loadColumns({ boardIndex: this.boardIndex }));
  }

  get subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtask() {
    this.subtasks.push(this.fb.control(''));
  }
}
