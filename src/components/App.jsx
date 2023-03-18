import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { addWantedValue } from 'redux/filterSlice';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();
  const handleContactAdd = ({ name, number }) => {
    const normalizationName = name.toLowerCase();

    const alreadyInContacts = contacts.some(
      ({ name }) => name.toLocaleLowerCase() === normalizationName
    );
    if (alreadyInContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      name: name,
      number: number,
      id: nanoid(),
    };

    setContacts(contacts => [...contacts, newContact]);
  };

  const handleFilterChange = evt => {setFilter(evt.target.value);
    const value = evt.target.value;
    dispatch(addWantedValue(value));}
  const handleContactsFiltered = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const handleContactItemDelete = taskId => {
    setContacts(contacts.filter(contact => contact.id !== taskId));
    dispatch(deleteContact(taskId));
  };

  useEffect(() => {
    const list = window.localStorage.getItem('contacts-list');
    if (!list) return;
    setContacts(JSON.parse(list));
  }, []);

  useEffect(() => {
    const contactListStringified = JSON.stringify(contacts);
    window.localStorage.setItem('contacts-list', contactListStringified);
  }, [contacts]);
  console.log(contacts);
  return (
    <div className={css.phonebook}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleContactAdd} />
      <h2>Contacts</h2>
      {contacts.length > 0 && (
        <div>
          <Filter value={filter} onChange={handleFilterChange} />
          <ContactList
            contacts={handleContactsFiltered()}
            onDelete={handleContactItemDelete}
          />
        </div>
      )}
    </div>
  );
};
