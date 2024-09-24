import { createReducer, on } from '@ngrx/store';
import { initialUIState } from './ui.state';
import { closeModal, openModal } from './ui.actions';

export const UIReducer = createReducer(
  initialUIState,
  on(openModal, (state) => ({ ...state, isOpen: true })),
  on(closeModal, (state) => ({ ...state, isOpen: false }))
);
