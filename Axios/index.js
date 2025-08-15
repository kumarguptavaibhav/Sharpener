// Write your code below:
let isEdit = false;
let editId = null;
let editList = null;
window.addEventListener("DOMContentLoaded", function (event) {
  event.preventDefault();
  axios
    .get(
      "https://crudcrud.com/api/826d6551a6f04e3bbe3e83bfbe4a06ed/appointmentData"
    )
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        displayUser(res.data[i]);
      }
    })
    .catch((err) => console.log(err));
});
function handleFormSubmit(event) {
  event.preventDefault();
  const user_obj = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };
  if (isEdit) {
    axios
      .put(
        `https://crudcrud.com/api/826d6551a6f04e3bbe3e83bfbe4a06ed/appointmentData/${editId}`,
        user_obj
      )
      .then((res) => {
        editList.remove();
        displayUser(res.data);
        isEdit = false;
        editId = null;
        editList = null;
        event.target.reset();
      })
      .catch((err) => console.log(err));
  } else {
    axios
      .post(
        "https://crudcrud.com/api/826d6551a6f04e3bbe3e83bfbe4a06ed/appointmentData",
        user_obj
      )
      .then((res) => {
        displayUser(res.data);
        event.target.reset();
      })
      .catch((err) => console.log(err));
  }
}

function displayUser(data) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.appendChild(
    document.createTextNode(`${data.username}-${data.email}-${data.phone}`)
  );

  const delete_btn = document.createElement("button");
  delete_btn.appendChild(document.createTextNode("Delete"));
  li.appendChild(delete_btn);
  const edit_btn = document.createElement("button");
  edit_btn.appendChild(document.createTextNode("Edit"));
  li.appendChild(edit_btn);
  ul.appendChild(li);

  delete_btn.addEventListener("click", function (event) {
    event.preventDefault();
    deleteUser(data._id, li);
  });

  edit_btn.addEventListener("click", function (event) {
    event.preventDefault();
    editUser(data, li);
  });
}

function deleteUser(id, li) {
  axios
    .delete(
      `https://crudcrud.com/api/826d6551a6f04e3bbe3e83bfbe4a06ed/appointmentData/${id}`
    )
    .then((res) => {
      li.remove();
    })
    .catch((err) => console.log(err));
}

function editUser(data, li) {
  document.getElementById("username").value = data.username;
  document.getElementById("email").value = data.email;
  document.getElementById("phone").value = data.phone;

  isEdit = true;
  editId = data._id;
  editList = li;
}

// Do not touch the code below
module.exports = handleFormSubmit;
