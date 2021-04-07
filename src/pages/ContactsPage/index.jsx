import React, {useState, useEffect, useMemo} from "react";
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
  const [selectedContact, setSelectedContact] = useState({});
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    setContacts([...data]);
  }, []);

  const selectContactForEdit = (selectedContact) => {
    setSelectedContact(selectedContact);
    setShowForm(true);
  };

  const addContact = (contact) => {
    setContacts([{id: id(), ...contact}, ...contacts]);
  };

  const updateContact = (contact) => {
    setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
    setSelectedContact({});
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

  const handleShowForm = () => setShowForm((x) => (x = !x));

  const closeForm = () => {
    setSelectedContact({});
    handleShowForm();
  };

  const value = useMemo(() => ({deleteContact, selectContactForEdit}), []);

  return (
    <ContactContext.Provider value={value}>
      {showForm ? (
        <ContactForm
          saveContact={saveContact}
          selectedContact={selectedContact}
          handleShowForm={handleShowForm}
          closeForm={closeForm}
        />
      ) : (
        <>
          <h2>Contacts List</h2>
          <div className="row mb-3 d-flex justify-content-between">
            <Filter filter={filter} updateFilter={updateFilter} />
            <button className="btn btn-primary col-3" onClick={handleShowForm}>
              <i className="bi bi-person-plus" />
              Add contact
            </button>
          </div>
          <ContactsList
            contacts={contacts.filter((contact) =>
              contact.name.toLowerCase().includes(filter.toLowerCase())
            )}
          />
        </>
      )}
    </ContactContext.Provider>
  );
};

export default ContactsPage;
