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
}
