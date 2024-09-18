import { CommonModule, NgClass, NgComponentOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogueService } from '../../services/dialogue/dialogue.service';
import { CreateBoardComponent } from '../operations/board/create-board/create-board.component';
import { TaskDetailsComponent } from '../operations/task/task-details/task-details.component';
import { CreateTaskComponent } from "../operations/task/create-task/create-task.component";
import { DeleteBoardComponent } from "../operations/board/delete-board/delete-board.component";

@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [NgClass, NgComponentOutlet, CommonModule, CreateBoardComponent, TaskDetailsComponent, CreateTaskComponent, DeleteBoardComponent],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.css',
})
export class DialogueComponent implements OnInit {
  modalStatus!: boolean;
  dialogueMode!: string;

  constructor(public dialogueService: DialogueService) {}

  ngOnInit(): void {
    this.dialogueService.isDialogueActive$.subscribe((status) => {
      this.modalStatus = status;
    });

    this.dialogueService.dialogueMode$.subscribe((mode) => {
      this.dialogueMode = mode;
    });
  }

  toggleDialogue() {
    this.dialogueService.toggleDialogue();
  }
}
