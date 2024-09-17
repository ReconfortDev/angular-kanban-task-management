import { Column } from "../../models";

export interface ColumnState {
  columns: Column[];
  error: any;
  loading: boolean;
};

export const initialState: ColumnState = {
  columns: [],
  error: null,
  loading: false,
};