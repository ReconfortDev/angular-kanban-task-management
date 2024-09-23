import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class DialogueService {
  private isDialogueActiveSubject = new BehaviorSubject<boolean>(false);
  private dialogueModeSubject = new BehaviorSubject<string>('');
  private deleteConfirmedSubject = new BehaviorSubject<boolean>(false);
  private selectedTaskSubject = new BehaviorSubject<Task | null>(null);

  selectedTask$ = this.selectedTaskSubject.asObservable();
  isDialogueActive$ = this.isDialogueActiveSubject.asObservable();
  dialogueMode$ = this.dialogueModeSubject.asObservable();
  deleteConfirmed$ = this.deleteConfirmedSubject.asObservable();

  openDialogue(mode: string, task?: Task) {
    this.dialogueModeSubject.next(mode);
    if (task) {
      this.selectedTaskSubject.next(task);
    }
    this.isDialogueActiveSubject.next(true);
  }

  closeModal() {
    this.isDialogueActiveSubject.next(false);
    this.dialogueModeSubject.next('');
  }

  toggleDialogue() {
    const currentState = this.isDialogueActiveSubject.value;
    this.isDialogueActiveSubject.next(!currentState);
  }

  // Call this method when user confirms deletion
  confirmDeletion() {
    this.deleteConfirmedSubject.next(true);
  }

  // Call this method when user cancels deletion
  cancelDeletion() {
    this.deleteConfirmedSubject.next(false);
  }
}
