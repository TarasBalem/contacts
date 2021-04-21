import {db, auth} from "firebaseInit";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  contacts: {
    fetchAll: () => db.collection("contacts").get(),
    create: (contact) => db.collection("contacts").add(contact),
    update: (contact) =>
      db.collection("contacts").doc(contact.id).update(contact),
    delete: (contact) => db.collection("contacts").doc(contact).delete(),
  },
  users: {
    create: (email, password) =>
      auth.createUserWithEmailAndPassword(email, password),
    login: (email, password) =>
      auth.signInWithEmailAndPassword(email, password),
    logout: () => auth.signOut(),
  },
};

export const getAuthUser = (user) =>
  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      authUser = user;
    } else return;
  });
