import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemeState } from '../../../state/theme/theme.reducer';
import { toggleTheme } from '../../../state/theme/theme.actions';
import { map, Observable } from 'rxjs';
import { Board } from '../../../models';
import { BoardState } from '../../../state/boards/board.state';
import { loadBoards } from '../../../state/boards/board.actions';
import { DialogueService } from '../../../services/dialogue/dialogue.service';
import { loadColumns } from '../../../state/columns/column.action';
import { DialogueComponent } from '../../dialogue/dialogue.component';
import { BoardService } from '../../../services/board/board.service';
import { TaskState } from '../../../state/task/task.state';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, CommonModule, AsyncPipe, DialogueComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  isSideBarHidden = false;
  theme!: 'light' | 'dark';
  boards$!: Observable<Board[]>;
  totalBoards = 0;
  activeBoardIndex = 0;
  activeBoard: Board | null = null;

  @Output() isSideBarActive = new EventEmitter<boolean>();

  constructor(
    private store: Store<{ theme: ThemeState; board: BoardState, task: TaskState }>,
    private dialogueService: DialogueService,
    private boardService: BoardService
  ) {}

  ngOnInit() {
    this.store.select('theme').subscribe((state) => {
      this.theme = state.theme;
      document.documentElement.classList.toggle('dark', this.theme === 'dark');
    });

    this.boards$ = this.store.select((state) => state.task.boards);
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
    this.boards$.pipe(map((boards) => boards.findIndex((b) => b === board))).subscribe((index) => {
      this.activeBoardIndex = index;
      console.log('Setting activeBoardIndex in SidebarComponent to:', index);
      this.boardService.activeBoardIndex = this.activeBoardIndex;
      this.activeBoard = board;
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

  openCreateBoard() {
    this.dialogueService.openDialogue('createBoard');
  }
}
