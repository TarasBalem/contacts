import React, {useState, useEffect, useMemo} from "react";
import {generate as id} from "shortid";
import ContactContext from "contexts/ContactContext";
import ContactsList from "pages/ContactsPage/components/ContactsList";
import ContactForm from "pages/ContactsPage/components/ContactForm";
import {contacts as data} from "data";

const initialState = {
  contacts: [],
};

const App = () => {
  const [contacts, setContacts] = useState(initialState.contacts);
  const [selectedContact, setSelectedContact] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setContacts([...data]);
  }, []);

  const selectContactForEdit = (selectedContact) => {
    setSelectedContact(selectedContact);
  };

  const addContact = (contact) => {
    setContacts([{id: id(), ...contact}, ...contacts]);
  };

  const updateContact = (contact) => {
    setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
    setSelectedContact({});
  };

  const saveContact = (contact) =>
    contact.id ? updateContact(contact) : addContact(contact);

  const deleteContact = (id) => {
    setContacts((contacts) => contacts.filter((c) => c.id !== id));
  };

  const updateFilter = ({target}) => {
    setFilter(target.value);
  };

  const value = useMemo(() => ({deleteContact, selectContactForEdit}), []);

  return (
    <ContactContext.Provider value={value}>
      <div className="container">
        <h2>Contacts List</h2>
        <div className="row mb-3 d-flex justify-content-between">
          <div className="col-4 p-0">
            <input
              type="text"
              value={filter}
              onChange={updateFilter}
              placeholder="Search"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary col-3">
            <i className="bi bi-person-plus" />
            Add contact
          </button>
        </div>
        <ContactForm
          saveContact={saveContact}
          selectedContact={selectedContact}
        />
        <ContactsList
          contacts={contacts.filter((contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )}
        />
      </div>
    </ContactContext.Provider>
  );
};

export default App;
