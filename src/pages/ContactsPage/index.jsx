import React, {useState, useEffect, useMemo} from "react";
import {Route, Link} from "react-router-dom";
import {generate as id} from "shortid";
import ContactContext from "contexts/ContactContext";
import ContactsList from "pages/ContactsPage/components/ContactsList";
import ContactForm from "pages/ContactsPage/components/ContactForm";
import Filter from "components/Filter";
import {contacts as data} from "data";

const initialState = {
  contacts: [],
};
const ContactsPage = () => {
  const [contacts, setContacts] = useState(initialState.contacts);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setContacts([...data]);
  }, []);

  const addContact = (contact) => {
    setContacts([{id: id(), ...contact}, ...contacts]);
  };

  const updateContact = (contact) => {
    setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
  };

  const saveContact = (contact) => {
    contact.id ? updateContact(contact) : addContact(contact);
  };

  const deleteContact = (id) => {
    setContacts((contacts) => contacts.filter((c) => c.id !== id));
  };

  const updateFilter = ({target}) => {
    setFilter(target.value);
  };

  const value = useMemo(() => ({deleteContact}), []);

  return (
    <ContactContext.Provider value={value}>
      <Route path="/contacts/new">
        <ContactForm saveContact={saveContact} selectedContact={{}} />
      </Route>

      <Route
        path="/contacts/edit/:id"
        render={({match}) => {
          return (
            <ContactForm
              saveContact={saveContact}
              selectedContact={
                contacts.find((c) => String(c.id) === match.params.id) || {}
              }
            />
          );
        }}
      />

      <Route exact path="/contacts">
        <h2>Contacts List</h2>
        <div className="row mb-3 d-flex justify-content-between">
          <Filter filter={filter} updateFilter={updateFilter} />
          <Link to="/contacts/new" className="btn btn-primary col-3">
            <i className="bi bi-person-plus" /> Add contact
          </Link>
        </div>
        <ContactsList
          contacts={contacts.filter((contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )}
        />
      </Route>
    </ContactContext.Provider>
  );
};

export default ContactsPage;
