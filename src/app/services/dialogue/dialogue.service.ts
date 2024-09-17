import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogueService {

  private isDialogueActiveSubject = new BehaviorSubject<boolean>(false);

  isDialogueActive$ = this.isDialogueActiveSubject.asObservable();

  openDialogue() {
    this.isDialogueActiveSubject.next(true);
  }

  closeModal() {
    this.isDialogueActiveSubject.next(false);
  }

  toggleDialogue() {
    const currentState = this.isDialogueActiveSubject.value;
    this.isDialogueActiveSubject.next(!currentState);
  }
}
