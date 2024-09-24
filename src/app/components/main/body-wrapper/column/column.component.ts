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
  private colors: string[] = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8333',
    '#33FFF3', '#47a573', '#D433FF', '#A1FF33', '#FFB833'
  ];

  constructor(private store: Store, private boardService: BoardService) {}

  // drop(event: CdkDragDrop<Task[]>) {
  //   const previousColumn = event.previousContainer.data;
  //   const newColumn = event.container.data;
  //
  //   // If the task is moved within the same column
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(previousColumn, event.previousIndex, event.currentIndex);
  //   } else {
  //     // Dispatch action to move task between columns
  //     const task = previousColumn[event.previousIndex];
  //
  //     const newColumnName = event.container.element.nativeElement.getAttribute('data-column-name') ?? '';
  //
  //     this.store.dispatch(
  //       moveTask({
  //         boardIndex: this.boardService.activeBoardIndex,
  //         task,
  //         previousColumnName: this.column.name,
  //         newColumnName,
  //         previousIndex: event.previousIndex,
  //         newIndex: event.currentIndex
  //       })
  //     );
  //
  //     transferArrayItem(previousColumn, newColumn, event.previousIndex, event.currentIndex);
  //   }
  // }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getColorForColumn(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash % this.colors.length);
    return this.colors[colorIndex];
  }
}
