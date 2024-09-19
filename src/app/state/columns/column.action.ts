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

