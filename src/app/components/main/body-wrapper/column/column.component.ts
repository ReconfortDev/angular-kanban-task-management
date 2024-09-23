import { Component, Input } from '@angular/core';
import { TaskCardComponent } from './task-card/task-card.component';
import { Column, Task } from '../../../../models';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { moveTask } from '../../../../state/task/task.actions';
import { BoardService } from '../../../../services/board/board.service';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, TaskCardComponent, CdkDropList, CdkDrag],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
})
export class ColumnComponent {
  @Input() column!: Column;

  constructor(private store: Store, private boardService: BoardService) {}

  drop(event: CdkDragDrop<Task[]>) {
    const previousColumn = event.previousContainer.data;
    const newColumn = event.container.data;

    // If the task is moved within the same column
    if (event.previousContainer === event.container) {
      moveItemInArray(previousColumn, event.previousIndex, event.currentIndex);
    } else {
      // Dispatch action to move task between columns
      const task = previousColumn[event.previousIndex];

      const newColumnName = event.container.element.nativeElement.getAttribute('data-column-name') ?? '';

      this.store.dispatch(
        moveTask({
          boardIndex: this.boardService.activeBoardIndex,
          task,
          previousColumnName: this.column.name,
          newColumnName,
          previousIndex: event.previousIndex,
          newIndex: event.currentIndex
        })
      );

      transferArrayItem(previousColumn, newColumn, event.previousIndex, event.currentIndex);
    }
  }
}
