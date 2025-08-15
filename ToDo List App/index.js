window.addEventListener("DOMContentLoaded", function (event) {
  event.preventDefault();
  axios
    .get("https://crudcrud.com/api/826d6551a6f04e3bbe3e83bfbe4a06ed/todoApp")
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        displayTodo(res.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function handleAdd(event) {
  event.preventDefault();
  const todo_obj = {
    todoname: event.target.todoname.value,
    tododescription: event.target.tododescription.value,
    status: false,
  };
  axios
    .post(
      "https://crudcrud.com/api/826d6551a6f04e3bbe3e83bfbe4a06ed/todoApp",
      todo_obj
    )
    .then((res) => displayTodo(res.data))
    .catch((err) => console.log(err));
}

function displayTodo(data) {
  const tbodyremaining = document.getElementById("tbodyremaining");
  const tbodydone = document.getElementById("tbodydone");
  if (data.status) {
    const tr = document.createElement("tr");
    const tdname = document.createElement("td");
    tdname.textContent = data.todoname;
    const tddescription = document.createElement("td");
    tddescription.textContent = data.tododescription;
    tr.appendChild(tdname);
    tr.appendChild(tddescription);
    tbodydone.appendChild(tr);
  } else {
    const tr = document.createElement("tr");
    const tdname = document.createElement("td");
    tdname.textContent = data.todoname;
    const tddescription = document.createElement("td");
    tddescription.textContent = data.tododescription;
    const done_btn = document.createElement("button");
    done_btn.textContent = "Done";
    done_btn.className = "btn btn-success";
    const delete_btn = document.createElement("button");
    delete_btn.textContent = "Delete";
    delete_btn.className = "btn btn-danger";
    const tdbuttons = document.createElement("td");
    tdbuttons.appendChild(done_btn);
    tdbuttons.appendChild(delete_btn);
    tr.appendChild(tdname);
    tr.appendChild(tddescription);
    tr.appendChild(tdbuttons);
    tbodyremaining.appendChild(tr);
    done_btn.addEventListener("click", function (event) {
      event.preventDefault();
      doneTodo(data, data._id, tr);
    });
    delete_btn.addEventListener("click", function (event) {
      event.preventDefault();
      deleteTodo(data._id, tr);
    });
  }
}

function deleteTodo(id, tr) {
  axios
    .delete(
      `https://crudcrud.com/api/826d6551a6f04e3bbe3e83bfbe4a06ed/todoApp/${id}`
    )
    .then((res) => {
      tr.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function doneTodo(data, id, tr) {
  const updateData = {
    todoname: data.todoname,
    tododescription: data.tododescription,
    status: true,
  };
  axios
    .put(
      `https://crudcrud.com/api/826d6551a6f04e3bbe3e83bfbe4a06ed/todoApp/${id}`,
      updateData
    )
    .then((res) => {
      tr.remove();
      displayTodo({ ...updateData, _id: id });
    })
    .catch((err) => {
      console.log(err);
    });
}
