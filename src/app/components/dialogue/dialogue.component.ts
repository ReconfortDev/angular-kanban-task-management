import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DialogueService } from '../../services/dialogue/dialogue.service';

@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.css'
})
export class DialogueComponent implements OnInit{

  modalStatus!: boolean;

  ngOnInit(): void {
    this.dialogueService.isDialogueActive$.subscribe(status => {
      this.modalStatus = status;
    });
  }
  
  constructor(public dialogueService: DialogueService ){}
  toggleDialogue() {
    this.dialogueService.toggleDialogue();
  }

}
