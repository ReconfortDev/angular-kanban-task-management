import { createAction, props } from '@ngrx/store';
import { Column } from '../../models';

export const loadColumns = createAction(
    '[Column] Load Columns',
    props<{ boardIndex: number }>()
);

export const loadColumnsSuccess = createAction(
  '[Columns] Load Columns Success',
  props<{ columns: Column[] }>()
);

export const loadColumnsFailure = createAction(
  '[Columns] Load Columns Failure',
  props<{ error: any }>()
);

export const addColumn = createAction(
  '[Columns] Add Column',
  props<{ column: Column }>()
);

export const updateColumn = createAction(
  '[Columns] Update Column',
  props<{ column: Column }>()
);

export const deleteColumn = createAction(
  '[Columns] Delete Column',
  props<{ columnId: string }>()
);