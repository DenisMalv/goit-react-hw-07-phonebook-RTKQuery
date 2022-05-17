import React from 'react';
import css from './filter.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { getFilterValue } from 'redux/contactsSlice/contactsSlice';
import { filterContact } from 'redux/contactsSlice/contactsSlice';

const Filter = () => {
  const filterInputValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const handleFilterInput = event => {
    dispatch(filterContact({ text: event.currentTarget.value }));
  };

  return (
    <>
      <label className={css.label}>
        Find by contact name
        <input
          className={css.inputFilter}
          type="text"
          value={filterInputValue}
          onChange={handleFilterInput}
        ></input>
      </label>
    </>
  );
};

export default Filter;
