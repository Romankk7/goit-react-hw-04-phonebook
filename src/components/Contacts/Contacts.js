import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import ContactsFilter from 'components/Filter/Filter';

import css from './Contacts.module.css';

const Contacts = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'))
    return contacts ? contacts : []
  })
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);

   const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
        return Boolean(result);
  };

  const addContact = ({ name, number }) => {
    if (isDublicate(name)) {
      return alert(`${name} is already in contacts`);
    }

 setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...prevContacts];
    });
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id));
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };



  const getFilteredContacts = () => {

    if (!filter) {
      return contacts;
    }

    const normalizedName = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedName);
    });

    return result;
  }


    const filteredContacts = getFilteredContacts();

    return (
      <div>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onSubmit={addContact} />
        <ContactsFilter
          handleChange={handleFilter}
          value={filter}
        />
        <h2 className={css.title}>Contacts</h2>
        <ContactList removeContact={removeContact} contacts={filteredContacts} />
      </div>
    );
  }
export default Contacts;