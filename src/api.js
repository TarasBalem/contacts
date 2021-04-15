import {db} from "firebaseInit";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  contacts: {
    fetchAll: () => db.collection("contacts").get(),
    create: (contact) => db.collection("contacts").add(contact),
    update: (contact) =>
      db
        .collection("contacts")
        .doc(contact.id)
        .update(contact)
        .then((r) => console.log(r)),
    delete: (contact) => db.collection("contacts").doc(contact).delete(),
  },
};
