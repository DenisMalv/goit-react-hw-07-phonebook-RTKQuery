import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContactsThunk,
  fetchAddContactThunk,
  fetchDeleteContactsThunk,
} from 'redux/contactsOperations/contactsOperations';

const pending = state => {
  state.isLoading = true;
  state.error = null;
};
const rejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    isLoading: true,
    error: null,
  },
  reducers: {
    filterContact: (state, action) => {
      state.filter = action.payload.text;
    },
  },
  extraReducers: {
    // фетч за контактами.
    [fetchContactsThunk.fulfilled]: (state, action) => {
      console.log(action);
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchContactsThunk.pending]: state => {
      pending(state);
    },
    [fetchContactsThunk.rejected]: (state, action) => {
      rejected(state, action);
    },
    // фетч добавления контакта.
    [fetchAddContactThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
    },
    [fetchAddContactThunk.pending]: state => {
      pending(state);
    },
    [fetchAddContactThunk.rejected]: (state, action) => {
      rejected(state, action);
    },
    // фетч удаления контакта.
    [fetchDeleteContactsThunk.fulfilled]: state => {
      state.isLoading = false;
      state.error = null;
    },
    [fetchDeleteContactsThunk.pending]: state => {
      pending(state);
    },
    [fetchDeleteContactsThunk.rejected]: (state, action) => {
      rejected(state, action);
    },
  },
});

export const { addContact, deleteContact, filterContact } =
  contactsSlice.actions;
export const contactsSliceReducer = contactsSlice.reducer;

// Selectors
export const getContacts = state => state.contacts.items;
export const getFilterValue = state => state.contacts.filter;
export const getLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;
