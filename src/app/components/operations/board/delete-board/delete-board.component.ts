import { Component } from '@angular/core';
import { DialogueService } from '../../../../services/dialogue/dialogue.service';

@Component({
  selector: 'app-delete-board',
  standalone: true,
  imports: [],
  templateUrl: './delete-board.component.html',
  styleUrl: './delete-board.component.css'
})
export class DeleteBoardComponent {
  constructor(private dialogueService: DialogueService) {
    this.dialogueService.deleteConfirmed$.subscribe((confirmed) => {
      if (confirmed) {
        // Logic to delete the board goes here
        console.log('Board deletion confirmed.');
      } else {
        console.log('Board deletion canceled.');
      }
    });
  }

  confirmDelete() {
    this.dialogueService.confirmDeletion(); // Notify that deletion is confirmed
    this.dialogueService.closeModal(); // Close the dialogue
  }

  cancelDelete() {
    this.dialogueService.cancelDeletion(); // Notify that deletion is canceled
    this.dialogueService.closeModal(); // Close the dialogue
  }
}
