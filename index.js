const expenseForm = document.getElementById('expense-form');
const expenseInput = document.getElementById('expense-input');
const amountInput = document.getElementById('amount-input');
const expenseList = document.getElementById('expense-list');
const expenseTotal = document.getElementById('expense-total');

let expenses = [];

const addExpense = (e) => {
  e.preventDefault();

  const expense = {
    name: expenseInput.value,
    amount: parseInt(amountInput.value)
  };

  expenses.push(expense);

  populateExpenseList(expenses);
  updateExpenseTotal(expenses);
  storeExpenses(expenses);

  expenseInput.value = '';
  amountInput.value = '';
};

const populateExpenseList = (expenses) => {
  expenseList.innerHTML = '';

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.name}: ${expense.amount}
      <button class="delete-btn" data-index="${index}">Delete</button>
      <button class="edit-btn" data-index="${index}">Edit</button>
    `;
    expenseList.appendChild(li);
  });
};

const deleteExpense = (index) => {
  expenses.splice(index, 1);
  populateExpenseList(expenses);
  updateExpenseTotal(expenses);
  storeExpenses(expenses);
};

const editExpense = (index) => {
  const expense = expenses[index];
  expenseInput.value = expense.name;
  amountInput.value = expense.amount;

  expenses.splice(index, 1);

  populateExpenseList(expenses);
  updateExpenseTotal(expenses);
  storeExpenses(expenses);
};

const updateExpenseTotal = (expenses) => {
  let total = 0;

  expenses.forEach((expense) => {
    total += expense.amount;
  });

  expenseTotal.innerHTML = total;
};

const storeExpenses = (expenses) => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

const getExpenses = () => {
  const storedExpenses = localStorage.getItem('expenses');

  if (storedExpenses) {
    expenses = JSON.parse(storedExpenses);
    populateExpenseList(expenses);
    updateExpenseTotal(expenses);
  }
};

expenseForm.addEventListener('submit', addExpense);
expenseList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.dataset.index;
    deleteExpense(index);
  } else if (e.target.classList.contains('edit-btn')) {
    const index = e.target.dataset.index;
    editExpense(index, e.target.dataset.expense);
  }
});