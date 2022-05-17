import { configureStore } from '@reduxjs/toolkit';
import { contactsSliceReducer } from './contactsSlice/contactsSlice';

// store
export const store = configureStore({
  reducer: {
    contacts: contactsSliceReducer,
  },
});
