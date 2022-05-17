import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: '',
  },
  reducers: {
    filterContact: (state, action) => {
      state.filter = action.payload.text;
    },
  },
});

export const { addContact, deleteContact, filterContact } =
  contactsSlice.actions;
export const contactsSliceReducer = contactsSlice.reducer;

// Selectors
export const getFilterValue = state => state.filter.filter;
