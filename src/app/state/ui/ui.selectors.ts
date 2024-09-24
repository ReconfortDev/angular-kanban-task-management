import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from './ui.state';

export const selectModalState = createFeatureSelector<UIState>('ui');
export const isModalOpen = createSelector(
  selectModalState,
  (state: UIState) => state.isOpen
);
