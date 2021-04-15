import React, {useState, useEffect, useMemo} from "react";
import {Route, Link} from "react-router-dom";
import {generate as id} from "shortid";
import ContactContext from "contexts/ContactContext";
import ContactsList from "pages/ContactsPage/components/ContactsList";
import ContactForm from "pages/ContactsPage/components/ContactForm";
import ContactCard from "pages/ContactsPage/components/ContactCard";
import Filter from "components/Filter";
import Spinner from "components/Spinner";
import ErrorMessage from "components/ErrorMessage";
import api from "api";
import {sleep} from "utils";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    api.contacts
      .fetchAll()
      .then((snapshot) => {
        const fetchContacts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContacts(fetchContacts);
      })
      .catch((error) => {
        setErrors(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const addContact = (contact) => {
    setLoading(true);
    api.contacts
      .create(contact)
      .then((docRef) => setContacts([...contacts, {id: docRef.id, ...contact}]))
      .catch((error) => {
        setErrors(error);
      })
      .finally(() => setLoading(false));
  };

  const updateContact = (contact) => {
    setLoading(true);
    api.contacts
      .update(contact)
      .then(() =>
        setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)))
      )
      .catch((error) => {
        setErrors(error);
      })
      .finally(() => setLoading(false));
  };

  const saveContact = (contact) => {
    contact.id ? updateContact(contact) : addContact(contact);
  };

  const deleteContact = (contact) => {
    api.contacts
      .delete(contact.id)
      .then(() => {
        setContacts((contacts) => contacts.filter((c) => c.id !== contact.id));
      })
      .catch((error) => {
        setErrors(error);
      })
      .finally(() => setLoading(false));
  };

  const updateFilter = ({target}) => {
    setFilter(target.value);
  };

  const value = useMemo(() => ({deleteContact}), []);

  return (
    <ContactContext.Provider value={value}>
      <Route
        path="/contacts/contact/:id"
        render={({match}) => (
          <ContactCard
            selectedContact={contacts.find((c) => c.id === match.params.id)}
          />
        )}
      />

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
                contacts.find((c) => c.id === match.params.id) || {}
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

        {errors ? <ErrorMessage>{`${errors}`}</ErrorMessage> : null}

        {loading ? (
          <Spinner />
        ) : (
          <ContactsList
            contacts={contacts.filter((contact) =>
              contact.name.toLowerCase().includes(filter.toLowerCase())
            )}
          />
        )}
      </Route>
    </ContactContext.Provider>
  );
};

export default ContactsPage;
