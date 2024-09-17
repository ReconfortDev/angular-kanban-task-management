import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemeState } from '../../state/theme/theme.reducer';
import { toggleTheme } from '../../state/theme/theme.actions';
import { map, Observable } from 'rxjs';
import { Board } from '../../models';
import { BoardState } from '../../state/boards/board.state';
import { loadBoards } from '../../state/boards/board.actions';
import { DialogueComponent } from '../dialogue/dialogue.component';
import { DialogueService } from '../../services/dialogue/dialogue.service';
import { loadColumns } from '../../state/columns/column.action';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, CommonModule, AsyncPipe, DialogueComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  isSideBarHidden = false;
  isDarkMode = false;
  theme!: 'light' | 'dark';
  boards$!: Observable<Board[]>;
  totalBoards: number = 0;
  activeBoardIndex: number = 0;
  activeBoard: Board | null = null;

  @Output() isSideBarActive = new EventEmitter<boolean>();

  constructor(private store: Store<{ theme: ThemeState; board: BoardState }>, public dialogueService: DialogueService) {}

  ngOnInit() {
    this.store.select('theme').subscribe((state) => {
      this.theme = state.theme;
      document.documentElement.classList.toggle('dark', this.theme === 'dark');
    });

    this.boards$ = this.store.select((state) => state.board.boards);
    this.boards$.subscribe((boards) => {
      if (boards.length > 0) {
      this.activeBoard = boards[this.activeBoardIndex] || null;
      this.store.dispatch(loadColumns({ boardIndex: this.activeBoardIndex }));
      this.totalBoards = boards.length;
      } else {
      this.activeBoard = null;
      }
    });
    this.store.dispatch(loadBoards());
  }

  setActiveBoard(board: Board) {
    this.boards$.pipe(
      map(boards => boards.findIndex(b => b === board))
    ).subscribe(index => {
      this.activeBoardIndex = index;
      this.activeBoard = board;
      console.log('Selected id: ', this.activeBoardIndex)
      this.store.dispatch(loadColumns({ boardIndex: this.activeBoardIndex }));
    });
  }

  toggleSideBar() {
    this.isSideBarHidden = !this.isSideBarHidden;
    this.isSideBarActive.emit(this.isSideBarHidden);
  }
  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  toggleDialogue() {
    this.dialogueService.toggleDialogue();
  }
}
