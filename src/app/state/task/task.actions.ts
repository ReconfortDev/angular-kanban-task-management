import { createAction, props } from '@ngrx/store';
import {Task} from '../../models';

export const addTask = createAction('[Task] Add Task', props<{boardIndex: number, task: Task }>());

export const moveTask = createAction(
  '[Task] Move Task',
  props<{
    boardIndex: number
    task: Task;
    previousColumnName: string;
    newColumnName: string;
    previousIndex: number;
    newIndex: number;
  }>()
);
