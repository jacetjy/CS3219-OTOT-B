import React from 'react';
import './index.css';
import axios from 'axios';

function App() {

  const [contacts, setContacts] = React.useState([]);

  const onGetContacts = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/contacts",
    }).then((res) => {
      console.log(JSON.stringify(res));
      setContacts(res.data);
      if (contacts.length === 0) {
        alert("No contacts found. Try posting a contact!")
      }
    });
  }

  const onPostContact = () => {
    var postName = document.getElementById('name').value;
    var postPhone = document.getElementById('phone').value;
    var postEmail = document.getElementById('email').value;
    var postGender = document.getElementById('gender').value;
    if (postName === "" || postPhone === "" || postEmail === "") {
      return alert("Fill in Name, Phone, or Email before posting");
    } else {
      axios({
        method: "post",
        url: "http://localhost:8080/contacts/",
        data: {
          name: postName,
          phone: postPhone,
          email: postEmail,
          gender: postGender,
        }
      }).then((res) => {
        alert("Contact was successfully posted.");
      })
    }
  }

  const onDeleteContact = () => {
    var id;
    axios({
      method: "get",
      url: "http://localhost:8080/contacts",
    }).then((res) => {
      if (res.data.length == 0) {
        alert("No contacts available for deletion!");
        return;
      }
      id = res.data[0]._id;
      console.log("id: " + id);
      axios({
        method: "delete",
        url: `http://localhost:8080/contacts/${id}`,
      }).then((res) => {
        alert("Contact successfully deleted!");
      })
    });
  }

  const displayContacts = () => {
    return contacts.map((contact, index) => {
      return (
        <div class="contact">
          <p>name: {contact.name}</p>
          <p>phone: {contact.phone}</p>
          <p>email: {contact.email}</p>
          <p>----------------------</p>
        </div>
      )
    });
  }

  return (
    <>
    <div class="main">
      <div class="navbar">
        <nav class="navbar navbar-expand-md">
          <div class="collapse navbar-collapse" id="main-navigation">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#">Home</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="description">
        <h1>Welcome!</h1>
        <h3>Use this app to handle your contacts.</h3>
      </div>
      <div class="body">
        <div>
          <button class="btn btn-outline-secondary btn-lg" onClick={onGetContacts}>GET contacts</button>
        </div>
        <h3 class="text">Gets all contacts in your list</h3>
      </div>
      {contacts.length !== 0 ? (
          <>{displayContacts()}</>
      ) : null}
      <div class="body">
        <div>
          <button class="btn btn-outline-secondary btn-lg" onClick={onPostContact}>POST contact</button>
        </div>
        <h3 class="text">Post a contact</h3>
        <div>
            <div class="form-group">
              <input type="text" class="form-control" id="name" placeholder="Name" name=""/>
            </div>
            <div class="form-group">
                <input type="email" class="form-control" id="email" placeholder="Email Address" name="email"/>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="phone" placeholder="Phone Number" name="phone"/>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="gender" placeholder="Gender" name="gender"/>
            </div>
        </div>
      </div>
      <div class="body">
        <div>
          <button class="btn btn-outline-secondary btn-lg" onClick={onDeleteContact}>DELETE contact</button>
        </div>
        <h3 class="text">Deletes first contact in list</h3>
      </div>
    </div>
    </>
  );
}

export default App;
