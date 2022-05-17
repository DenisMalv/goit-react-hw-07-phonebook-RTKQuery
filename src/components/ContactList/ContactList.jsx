import css from './ContactList.module.css';
import ContactItem from 'components/ContactItem/ContactItem';
import Loader from 'components/Loader/Loader';
import { LoaderBackground } from 'components/Loader/LoaderBackground.styled';

import { getFilterValue } from 'redux/contactsSlice/contactsSlice';
import { useSelector } from 'react-redux';

import { useGetContactsRTKQuery } from 'redux/RTKContactsApi/ContactsApi';
import { getFilteredContacts } from 'utils/getFilteredContacts';

const ContactList = () => {
  const filterValue = useSelector(getFilterValue);
  //маунт списка при первой загрузке.
  const { data = [], isError, isFetching } = useGetContactsRTKQuery();

  return (
    <>
      {/* loader */}
      {isFetching && (
        <LoaderBackground>
          <Loader />
        </LoaderBackground>
      )}
      {/* error */}
      {isError && <h1>Error 404 :D</h1>}
      {/* notFound */}
      {getFilteredContacts(data, filterValue).length === 0 &&
        !isFetching &&
        !isError && (
          <p style={{ textAlign: 'center', fontSize: 24, fontWeight: 700 }}>
            Contact not found
          </p>
        )}
      {/* completed */}
      {getFilteredContacts(data, filterValue).length > 0 && (
        <ul className={css.contactList}>
          {getFilteredContacts(data, filterValue).map(
            ({ id, name, number }) => (
              <ContactItem id={id} name={name} number={number} key={id} />
            )
          )}
        </ul>
      )}
    </>
  );
};

export default ContactList;
