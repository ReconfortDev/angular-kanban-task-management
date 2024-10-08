import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/main/sidebar/sidebar.component';
import { HeaderComponent } from './components/main/header/header.component';
import { BodyWrapperComponent } from './components/main/body-wrapper/body-wrapper.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, BodyWrapperComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'kanban-task-managament';
  isSidebarVisible = true;

  handleSidebarToggle(isActive: boolean) {
    this.isSidebarVisible = !isActive;
  }
}
