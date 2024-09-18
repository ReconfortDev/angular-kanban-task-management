import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BoardState } from '../../state/boards/board.state';
import { addColumn, addBoard } from '../../state/boards/board.actions';
import { Board, Column } from '../../models';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DialogueService } from '../../services/dialogue/dialogue.service';

@Component({
  selector: 'app-create-board',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.css',
})
export class CreateBoardComponent implements OnInit {
  boardForm!: FormGroup;
  boards$!: Observable<Board[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store<BoardState>,
    private dialogueService: DialogueService,
  ) {
    this.boards$ = this.store.select((state) => state.boards);
  }

  ngOnInit(): void {
    this.boardForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      columns: this.fb.array([this.createColumn()]),
    });
  }

  get columns(): FormArray {
    return this.boardForm.get('columns') as FormArray;
  }

  createColumn(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      tasks: [[]],
    });
  }

  addColumn(): void {
    this.columns.push(this.createColumn());
  }

  removeColumn(index: number): void {
    this.columns.removeAt(index);
  }

  onSubmit(): void {
    if (this.boardForm.valid) {
      const board: Board = {
        name: this.boardForm.value.name,
        columns: this.boardForm.value.columns,
      };
      this.store.dispatch(addBoard({ board }));
      this.dialogueService.closeModal();
    }
  }
}
