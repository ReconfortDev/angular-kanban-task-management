import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemeState } from '../../state/theme/theme.reducer';
import { toggleTheme } from '../../state/theme/theme.actions';
import { Observable } from 'rxjs';
import { Board } from '../../models';
import { BoardState } from '../../state/boards/board.state';
import { loadBoards } from '../../state/boards/board.actions';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, CommonModule, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  isSideBarHidden = false;
  isDarkMode = false;
  theme!: 'light' | 'dark';
  boards$!: Observable<Board[]>;
  totalBoards: number = 0;
  activeBoard: Board | null = null;

  @Output() isSideBarActive = new EventEmitter<boolean>();

  constructor(private store: Store<{ theme: ThemeState; board: BoardState }>) {}

  ngOnInit() {
    this.store.select('theme').subscribe((state) => {
      this.theme = state.theme;
      document.documentElement.classList.toggle('dark', this.theme === 'dark');
    });

    this.boards$ = this.store.select((state) => state.board.boards);
    this.boards$.subscribe((boards) => {
      this.totalBoards = boards.length;
      this.activeBoard = boards[0] || null;
    });
    this.store.dispatch(loadBoards());
  }

  toggleSideBar() {
    this.isSideBarHidden = !this.isSideBarHidden;
    this.isSideBarActive.emit(this.isSideBarHidden);
  }
  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  setActiveBoard(board: Board) {
    this.activeBoard = board;
  }
}
