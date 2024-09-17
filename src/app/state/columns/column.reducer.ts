import { Action, createReducer, on } from "@ngrx/store";
import { loadColumnsSuccess, loadColumnsFailure, loadColumns } from "./column.action";
import { ColumnState, initialState } from "./colum.state";

const _columnReducer = createReducer(
  initialState,
  on(loadColumns, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadColumnsSuccess, (state, { columns }) => ({
    ...state,
    columns,
    loading: false,
  })),
  on(loadColumnsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
)

export function columnReducer(state: ColumnState | undefined, action: Action): ColumnState {
    return _columnReducer(state, action);
}