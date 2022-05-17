import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  tagTypes: ['Contacts', 'filter'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62828fa0ed9edf7bd88682d0.mockapi.io/contacts/',
  }),
  endpoints: build => ({
    getContactsRTK: build.query({
      query: () => 'conctacts',
      providesTags: ['Contacts'],
    }),
    addContactRTK: build.mutation({
      query: body => ({
        url: 'conctacts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContactRTK: build.mutation({
      query: id => ({
        url: `conctacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsRTKQuery,
  useAddContactRTKMutation,
  useDeleteContactRTKMutation,
} = contactsApi;
