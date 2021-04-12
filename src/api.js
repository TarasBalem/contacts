import axios from "axios";

const baseUrl =
  "https://contacts-book-ac49a-default-rtdb.firebaseio.com/contacts";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  contacts: {
    fetchAll: () => axios.get(`${baseUrl}.json`).then((res) => res.data),
    create: (contact) =>
      axios.post(`${baseUrl}.json`, contact).then((res) => res.data),
    update: (contact) => {
      axios
        .get(`${baseUrl}.json`)
        .then((res) =>
          Object.keys(res.data).filter((key) => res.data[key].id === contact.id)
        )
        .then((updateItem) =>
          axios.put(`${baseUrl}/${updateItem[0]}.json`, contact)
        );
    },
    delete: (contact) => {
      axios
        .get(`${baseUrl}.json`)
        .then((res) =>
          Object.keys(res.data).filter((key) => res.data[key].id === contact.id)
        )
        .then((deleteItem) =>
          axios.delete(`${baseUrl}/${deleteItem[0]}.json`, contact)
        );
    },
  },
};
