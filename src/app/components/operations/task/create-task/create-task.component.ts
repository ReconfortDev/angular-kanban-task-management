import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Board, Column, Task } from '../../../../models';
import { Observable } from 'rxjs';
import { ColumnState } from '../../../../state/columns/colum.state';
import { loadColumns } from '../../../../state/columns/column.action';
import { BoardService } from '../../../../services/board/board.service';
import { addTask } from '../../../../state/task/task.actions';
import { DialogueService } from '../../../../services/dialogue/dialogue.service';


@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent implements OnInit{
  taskForm!: FormGroup;
  boards: Board[] = [];
  columns$!: Observable<Column[]>;
  boardIndex = 0

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private columnStore: Store<{ column: ColumnState }>,
    private boardService: BoardService,
    private dialogueService:DialogueService,
    private cdr: ChangeDetectorRef

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

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }

    const task: Task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      status: this.taskForm.value.status,
      subtasks: this.taskForm.value.subtasks.map((title: string) => ({
        title,
        isCompleted: false,
      })),
    };

    console.log("this.boardService.activeBoardIndex: ", this.boardService.activeBoardIndex)

    this.store.dispatch(addTask({boardIndex: this.boardIndex ,task}));
    this.cdr.detectChanges();
    this.dialogueService.closeModal();
    this.taskForm.reset();
  }
}
