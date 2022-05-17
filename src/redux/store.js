import { contactsSliceReducer } from './contactsSlice/contactsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './RTKContactsApi/ContactsApi';

// store
export const store = configureStore({
  reducer: {
    filter: contactsSliceReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
