import { Component } from '@angular/core';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'app-body-wrapper',
  standalone: true,
  imports: [ColumnComponent],
  templateUrl: './body-wrapper.component.html',
  styleUrl: './body-wrapper.component.css',
})
export class BodyWrapperComponent {}
