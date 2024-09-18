import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DialogueService } from '../../../services/dialogue/dialogue.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isActionOpened = false;

  constructor(public dialogueService: DialogueService) {}

  toggleDialogue() {
    this.dialogueService.toggleDialogue();
  }

  toggleActionMenu() {
    this.isActionOpened = !this.isActionOpened;
  }

  openCreateBoard() {
    this.dialogueService.openDialogue('createTask');
  }

  openDeleteBoard() {
    this.dialogueService.openDialogue('deleteBoard');
  }
}
