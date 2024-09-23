import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DialogueService } from '../../../services/dialogue/dialogue.service';
import { BoardService } from '../../../services/board/board.service';
import { deleteBoard } from '../../../state/boards/board.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isActionOpened = false;
  boardIndex = 0

  constructor(
    private store: Store,
    private dialogueService: DialogueService,
    private boardService: BoardService,
  ) { this.boardIndex = this.boardService.activeBoardIndex }

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

    // Assuming the user confirms deletion in the dialogue, trigger the delete action
    this.dialogueService.deleteConfirmed$.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(deleteBoard({ boardIndex: this.boardIndex }));
      }
    });
  }
}
