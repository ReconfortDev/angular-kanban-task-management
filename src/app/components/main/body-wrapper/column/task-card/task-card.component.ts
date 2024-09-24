import { Component, Input } from '@angular/core';
import { Task } from '../../../../../models';
import { DialogueService } from '../../../../../services/dialogue/dialogue.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Input() index!: number;

  constructor(private dialogueService: DialogueService) {}

  openTaskDetails(task: Task) {
    this.dialogueService.openDialogue('taskDetails', task);
  }

  handleKeyDown(event: KeyboardEvent, task: any): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openTaskDetails(task);
    }
  }

  countCompletedSubtasks(): number {
    if (!this.task) return 0;
    return this.task.subtasks.filter((subtask) => subtask.isCompleted).length;
  }
}
