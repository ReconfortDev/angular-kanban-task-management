import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../../services/task/task.service';
import { addTask, updateTask, deleteTask } from './task.actions';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      tap(action => console.log('Add Task Action:', action)),
      mergeMap((action) =>
        this.taskService.addTaskToColumn(action.boardIndex, action.columnIndex, action.task).pipe(
          tap(boards => console.log('Updated Boards:', boards)),
          map((boards) => ({ type: '[Task] Add Task Success', boards })),
          catchError((error) => of({ type: '[Task] Add Task Failure', error })),
        ),
      ),
    ),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTask),
      mergeMap((action) =>
        this.taskService
          .updateTaskInColumn(action.boardIndex, action.columnIndex, action.taskIndex, action.task)
          .pipe(
            map((boards) => ({ type: '[Task] Update Task Success', boards })),
            catchError((error) => of({ type: '[Task] Update Task Failure', error })),
          ),
      ),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      mergeMap((action) =>
        this.taskService
          .deleteTaskFromColumn(action.boardIndex, action.columnIndex, action.taskIndex)
          .pipe(
            map((boards) => ({ type: '[Task] Delete Task Success', boards })),
            catchError((error) => of({ type: '[Task] Delete Task Failure', error })),
          ),
      ),
    ),
  );
}
