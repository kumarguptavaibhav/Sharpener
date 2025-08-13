function addExpense(event) {
  event.preventDefault();
  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;
  const unique_id = Date.now().toString() + Math.floor(Math.random() * 1000);
  const expense_obj = {
    amount: amount,
    description: description,
    category: category,
    id: unique_id,
  };
  const editingSessionId = sessionStorage.getItem("editingExpenseId");
  let expenseList = [];
  const existedList = JSON.parse(localStorage.getItem("expenseList"));

  if (editingSessionId) {
    if (existedList && existedList.length > 0) {
      expenseList = existedList.map((expense) => {
        if (expense.id === editingSessionId) {
          return {
            ...expense,
            amount: amount,
            description: description,
            category: category,
          };
        }
        return expense;
      });
    }
    sessionStorage.removeItem("editingExpenseId");
    document.querySelector('button[type="submit"]').textContent =
      "Add Expenses";
  } else {
    const unique_id = Date.now().toString() + Math.floor(Math.random() * 1000);
    const expense_obj = {
      amount: amount,
      description: description,
      category: category,
      id: unique_id,
    };

    if (existedList && existedList.length > 0) {
      expenseList = [...existedList, expense_obj];
    } else {
      expenseList = [expense_obj];
    }
  }
  localStorage.setItem("expenseList", JSON.stringify(expenseList));
  display();
  event.target.reset();
}

function display() {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";

  const expenseList = JSON.parse(localStorage.getItem("expenseList"));
  if (!expenseList || expenseList.length === 0) {
    return;
  }
  for (let i = 0; i < expenseList.length; i++) {
    const currentExpense = expenseList[i];
    const li = document.createElement("li");
    li.textContent =
      currentExpense.amount +
      currentExpense.description +
      currentExpense.category;

    const delete_btn = document.createElement("button");
    delete_btn.textContent = "Delete Expense";
    delete_btn.addEventListener("click", function (event) {
      event.preventDefault();
      delete_expense(currentExpense.id, li);
    });

    const edit_btn = document.createElement("button");
    edit_btn.textContent = "Edit Expense";
    edit_btn.addEventListener("click", function (event) {
      event.preventDefault();
      edit_expense(currentExpense.id);
    });

    li.appendChild(delete_btn);
    li.appendChild(edit_btn);
    ul.appendChild(li);
  }
}

function delete_expense(id, li) {
  let expenseList = JSON.parse(localStorage.getItem("expenseList"));
  expenseList = expenseList.filter((expense) => expense.id !== id);
  localStorage.setItem("expenseList", JSON.stringify(expenseList));
  display();
}

function edit_expense(id) {
  let expenseList = JSON.parse(localStorage.getItem("expenseList"));
  const expense = expenseList.find((exp) => exp.id === id);

  if (expense) {
    sessionStorage.setItem("editingExpenseId", id);
    document.getElementById("amount").value = expense.amount;
    document.getElementById("description").value = expense.description;
    document.getElementById("category").value = expense.category;
    display();
  }
}

window.addEventListener("load", function () {
  display();
});

module.exports = addExpense;
