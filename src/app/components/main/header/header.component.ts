import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DialogueService } from '../../../services/dialogue/dialogue.service';
import { BoardService } from '../../../services/board/board.service';
import { deleteBoard } from '../../../state/boards/board.actions';
import { Store } from '@ngrx/store';
import { isModalOpen } from '../../../state/ui/ui.selectors';
import { Observable } from 'rxjs';
import { closeModal, openModal } from '../../../state/ui/ui.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, AsyncPipe, NgIf, NgForOf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isActionOpened = false;
  boardIndex = 0;
  modalState$: Observable<boolean>;

  constructor(
    private store: Store,
    private dialogueService: DialogueService,
    private boardService: BoardService,

  ) {
    this.boardIndex = this.boardService.activeBoardIndex;
    this.modalState$ = this.store.select(isModalOpen);
  }

  toggleActionMenu() {
    this.isActionOpened = !this.isActionOpened;
  }

  openCreateBoard() {
    this.dialogueService.openDialogue('createTask');
  }

  openDeleteBoard() {
    this.dialogueService.openDialogue('deleteBoard');
    this.dialogueService.deleteConfirmed$.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(deleteBoard({ boardIndex: this.boardIndex }));
      }
    });
  }



  openModal() {
    this.store.dispatch(openModal())
  }


  closeModal() {
    this.store.dispatch(closeModal())
  }

}
