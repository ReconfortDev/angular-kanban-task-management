import { createAction, props } from '@ngrx/store';
import {Task} from '../../models';

export const addTask = createAction('[Task] Add Task', props<{boardIndex: number, task: Task }>());

export const addTaskSuccess = createAction(
  '[Task] Add Task Success',
  props<{ boardIndex:number ; columnIndex: number; task: Task }>()
);

export const addTaskFailed = createAction(
  '[Task] Add Task Failed',
  props<{ error: string }>()
);
