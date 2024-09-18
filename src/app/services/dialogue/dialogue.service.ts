import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogueService {
  private isDialogueActiveSubject = new BehaviorSubject<boolean>(false);
  private dialogueModeSubject = new BehaviorSubject<string>('');

  isDialogueActive$ = this.isDialogueActiveSubject.asObservable();
  dialogueMode$ = this.dialogueModeSubject.asObservable();

  openDialogue(mode: string) {
    this.dialogueModeSubject.next(mode);
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
}
