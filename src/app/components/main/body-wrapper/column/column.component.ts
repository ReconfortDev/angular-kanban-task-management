import { Component, Input } from '@angular/core';
import { TaskCardComponent } from './task-card/task-card.component';
import { Column } from '../../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
})
export class ColumnComponent {
  @Input() column!: Column;
}
