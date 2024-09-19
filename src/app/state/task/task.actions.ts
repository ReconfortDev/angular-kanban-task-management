import { createAction, props } from '@ngrx/store';
import {Task } from '../../models';

export const addTask = createAction(
  '[Task] Add Task',
  props<{ boardIndex: number; columnIndex: number; task: Task }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ boardIndex: number; columnIndex: number; taskIndex: number; task: Task }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ boardIndex: number; columnIndex: number; taskIndex: number }>()
);
